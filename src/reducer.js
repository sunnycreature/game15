import { READY, INPROGRESS, PAUSED, COMPLETED, INPUT_TOP_NAME } from './const.js'

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const prepareField = (w, h) => {
  const pool = [];
  for (let i = 0; i < w * h; i++) {
    pool[i] = i;
  }

 /* const field = [];
  for (let i = 0; i < h; i++) {
    field[i] = [];
    for (let j = 0; j < w; j++) {
      const k = getRandomInt(0, pool.length);
      if (pool[k] === 0) {
        field[i][j] = null;
      } else {
        field[i][j] = pool[k];
      }
      pool.splice(k, 1);
    }
  }*/
  const field = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23, 0, 24]];// [[1,2,3,4,5,6],[7,8,9,10,11,12],[13,14,15,16,17,18],[19,20,21,22,23,24], [25,26,27,28,29,30], [31,32,33,34,0,35]]
  return field;
} 

const getInitialState = (w, h, 
  top10 = [
    {
      selectedOption: 'numbers',
      w: 6,
      player: 'noname',
      elapsed: 500,
      moves: 10
    }  
  ], 
  selectedOption = 'numbers') => 
{
  return(
    {
      field:  prepareField(w, h),
      top10,      
      timerID: 0,
      elapsed: 0,
      moves: 0,
      stage: READY,
      selectedOption,
      widthCell: 104
    }
  );
};

export const gameReducer = (state = getInitialState(4, 4), action) => {

  const { stage, moves, selectedOption, field, top10, elapsed } = state;
  var newMoves = moves;
  const h = field.length;
  const w = field[0].length;

  if (action.type === 'CELL_CLICK' && stage === INPROGRESS) {
    const { x, y } = action;

    newMoves = newMoves + 1;

    const newField = [];
    for (let i = 0; i < h; i++) {
      newField.push([...field[i]]);
    }

    if (y > 0 && !newField[y-1][x]) {
      newField[y-1][x] = newField[y][x];
      newField[y][x] = null;
    }
    else if (x < w-1 && !newField[y][x+1]) {
      newField[y][x+1] = newField[y][x];
      newField[y][x] = null;
    }
    else if (y < h-1 && !newField[y+1][x]) {
      newField[y+1][x] = newField[y][x];
      newField[y][x] = null;
    }
    else if (x > 0 && !newField[y][x-1]) {
      newField[y][x-1] = newField[y][x];
      newField[y][x] = null;
    };

    let endGame = !newField[h-1][w-1];

    if (selectedOption === 'figures') {
      endGame = 
        newField.reduce( 
          (tr, r, ridx) => {
            const sorted = [...r].sort( 
              (a, b) => (a ? a : w * h) - (b ? b : w * h) 
            );
            return tr 
              && (sorted[0] % w) === 1 
              && sorted.reduce( 
                (tc, c, cidx) => 
                  tc && (
                    !cidx 
                    ||
                    (cidx === w - 1 && ridx === h - 1)
                    || 
                    sorted[cidx - 1] === (c ? c : w * h) - 1
                  ), 
                true)
          }, 
          endGame
        );
    } else {
      let k = 1;
      for (let i = 0; i < h && endGame; i++) {
        for (let j = 0; j < w && endGame; j++) {
          if (k < h * w) {
            endGame = newField[i][j] === k;
          }    
          k = k + 1;
        }
      }  
    }

    if (endGame) {
      const arr = top10.reduce( 
        (p, t) => {
          if (t.selectedOption === selectedOption && t.w === w) {
            p.push(t);
          }
          return p;
        },
        [] 
      );

      if (arr.length < 10 || arr.find( t => t.elapsed > elapsed )) {
        return {...state, field: newField, stage: INPUT_TOP_NAME, moves: newMoves}
      } else {
        return {...state, field: newField, stage: COMPLETED, moves: newMoves}
      }
    } else {
      return {...state, field: newField, moves: newMoves}      
    }
  } else if (action.type === 'START_GAME') {
    const { timerID } = action;

    if (stage === READY) {
      return {...state, timerID, elapsed: 1, stage: INPROGRESS, moves: 0}
    } else {
      const newState = getInitialState(w, h, top10, state.selectedOption);
      return {...newState, timerID, elapsed: 1, stage: INPROGRESS }
    }
  } else if (action.type === 'GAME_PAUSE') {
    return {...state, stage: PAUSED}
  } else if (action.type === 'GAME_RESUME') {
    return {...state, stage: INPROGRESS }
  } else if (action.type === 'STOP_GAME') {
    const { selectedOption } = state;
    return getInitialState(w, h, top10, selectedOption);
  } else if (action.type === 'TIME_TICK' && stage === INPROGRESS) {
    return {...state, elapsed: state.elapsed + 1000, moves: newMoves }
  } else if (action.type === 'CHANGE_OPTIONS' && (stage === READY || stage === COMPLETED)) {
    const { optvalue } = action;
    return {...state, selectedOption: optvalue}
  } else if (action.type === 'CHANGE_OPTIONS_SIZE' && (stage === READY || stage === COMPLETED)) {
    const { sizevalue } = action;
    const s = sizevalue.substr(sizevalue.length-1,1) 
    return {...state, field: prepareField(s, s)}  
  } else if (action.type === 'SET_TOPNAME') {
    const { namevalue } = action;    

    const arr = top10.reduce(
      (p, t) => {
        if (t.w === w && t.selectedOption === selectedOption) {
          p.push({...t});
        }
        return p;
      },
      []
    )

    arr.push(        
      {
        selectedOption,
        w,
        player: namevalue,
        elapsed,
        moves
      }  
    );

    arr.sort( (a, b) => a.elapsed - b.elapsed );

    const arrOther = top10.reduce(
      (p, t) => {
        if (t.w !== w || t.selectedOption !== selectedOption) {
          p.push({...t});
        }
        return p;
      },
      []
    )
    
    return {...state, stage: COMPLETED, top10: [...arrOther, ...arr.slice(0, 10)]}      
  } else if (action.type === 'CLOSE_TOPNAME') {
    return {...state, stage: COMPLETED}      
  } else {
    return state;
  }
};
