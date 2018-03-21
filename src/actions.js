
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

export function SetTopName (namevalue) {
  return {
    type: 'SET_TOPNAME',
    namevalue
  }
}

export function CloseInputNameDlg () {
  return {
    type: 'CLOSE_TOPNAME'
  }
}