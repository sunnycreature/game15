function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const getInitialState = (w, h) => {
  const pool = [];
  for (let i = 0; i < w * h; i++) {
    pool[i] = i;
  }

  const field = [];
  for (let i = 0; i < h; i++) {
    field[i] = [];
    for (let j = 0; j < w; j++) {
      const k = getRandomInt(0, pool.length);
      if (pool[k] = 0) {
        field[i][j] = null;
      } else {
      field[i][j] = pool[k];
      pool.splice(k, 1);
      }
    }
  }
  
  
  return(
    {
      field : [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,null,15]],
      finished: false
    }
  );    
};

export const gameReducer = (state = getInitialState(4, 4), action) => {

  if (action.type === 'CELL_CLICK') {
    const { field, finished } = state;
    const { x, y } = action;
    const h = field.length;
    const w = field[0].length;

    if (finished) {
      return state;
    } else { 
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

      let k = 1;
      let endGame = true;   
      for (let i = 0; i < h && endGame; i++) {
        for (let j = 0; j < w && endGame; j++) { 
          if (k < h * w) {   
            endGame = newField[i][j] === k;
          }  
          k = k + 1;  
        }
      } 

      return {...state, field: newField, finished: endGame}          
    }
  } else if (action.type === 'NEW_GAME') {
    return getInitialState(4, 4);
  } else {    
    return state;
  }  
};   
