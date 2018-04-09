import { HOST_ADDR } from './const';

function TimeTick(dispatch) {
  dispatch(
    {
      type: 'TIME_TICK'
    }
  )
}

export function CellClick(x, y) {
  return {
    type: 'CELL_CLICK',
    x,
    y
  }
}

export function ChangeOpt (optvalue) {
  return {
    type: 'CHANGE_OPTIONS',
    optvalue
  }
}

export function ChangeSize (sizevalue) {
  return {
    type: 'CHANGE_OPTIONS_SIZE',
    sizevalue
  }
}

export function StartGame(dispatch, timerID) {
  fetch(HOST_ADDR)
    .then(res => { return res.text(); })
    .then(res => JSON.parse(res) )
    .then(obj => {
        dispatch(LoadTop10(obj.top10));
    });  
  if (timerID) clearInterval(timerID);
  return {
    type: 'START_GAME',
    timerID: setInterval( () => TimeTick(dispatch), 1000)
  }
}

export function StopGame(timerID) {
  clearInterval(timerID)
  return {
    type: 'STOP_GAME'
  }
}

export function PauseGame(dispatch) {
  return {
    type: 'GAME_PAUSE'
  }
}

export function ResumeGame(dispatch) {
  return {
    type: 'GAME_RESUME'
  }
}

export function SetTopName (dispatch, namevalue, moves, elapsed, w, selectedOption) {

  fetch(HOST_ADDR)
  .then(res => res.text())
  .then(res => JSON.parse(res))
  .then(obj => obj.top10 )
  .then( obj => {

    const arr = obj.reduce(
      (p, t) => {
        if (t.w === w && t.selectedOption === selectedOption) {
          p.push({...t});
        }
        return p;
      },
      []
    );

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

    const arrOther = obj.reduce(
      (p, t) => {
        if (t.w !== w || t.selectedOption !== selectedOption) {
          p.push({...t});
        }
        return p;
      },
      []
    );
    const newTop10 = [...arrOther, ...arr.slice(0, 10)];

    return fetch(HOST_ADDR, { 
      method: 'POST',
      body:    JSON.stringify({version: '1.0', top10: newTop10}),
      headers: { 'Content-Type': 'application/json' },
    })
  })
  .then( () => fetch(HOST_ADDR) )
  .then(res => { return res.text(); })
  .then(res => JSON.parse(res) )
  .then(obj => dispatch(LoadTop10(obj.top10)))   
  .catch( err => console.log(err) );      

  return {
    type: 'SET_TOPNAME'
  }
}

fetch(HOST_ADDR)


export function CloseInputNameDlg () {
  return {
    type: 'CLOSE_TOPNAME'
  }
}

export function LoadTop10 (top10) {
  return {
    type: 'LOAD_TOP10',
    top10
  }
}