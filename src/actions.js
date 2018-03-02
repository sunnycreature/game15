
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

export function ChangeInput (what, value) {
  return {
    type: what === 'width' ? 'CHANGE_OPTIONS_W' : 'CHANGE_OPTIONS_H',
    value
  }
}

export function ChangeSize (sizevalue) {
  return {
    type: 'CHANGE_OPTIONS_SIZE',
    sizevalue
  }
}

export function StartGame(dispatch, timerID) {
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
