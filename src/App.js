import React, { Component } from 'react';
import './App.css';
import {Field} from './Field';
import { Provider, connect } from 'react-redux';
import { store } from './store';
import { GameButton } from './NewGameButton'
import { OptionsGame } from './OptionsGame'
import { TimerGame } from './TimerGame'
import { CellClick, StartGame, StopGame, PauseGame, ResumeGame, ChangeOpt, ChangeInput } from './actions'
import { READY, INPROGRESS, PAUSED, COMPLETED } from './const.js'

const ConnectedField = connect(
  (state) => (
    {
      fld: state.gameReducer.field,
      stage: state.gameReducer.stage,
      onGetCellClass: state.gameReducer.selectedOption === 'numbers' ? (v) => '' :
        state.gameReducer.selectedOption === 'figures' ?
        (v) => {
          if (v >= 1 && v <= 4) return 'Cell1'
          else if (v >= 5 && v <= 8) return 'Cell2'
          else if (v >= 9 && v <= 12) return 'Cell3'
          else return 'Cell4';
        } :
        (v) => {
             return state.gameReducer.paramHeight === 4 ? 'CellP' : 'CellP2';
        },
      fileImgName: state.gameReducer.fileImgName
    }
  ),
  (dispatch) => (
    {
      onCellClick: (x, y) => dispatch(CellClick(x, y))
    }
  )
)(Field);

const ConnectedOptionsGame = connect(
  (state) => (
    {
      selectedOption: state.gameReducer.selectedOption,
      visible: state.gameReducer.stage === READY || state.gameReducer.stage === COMPLETED,
      paramWidth: state.gameReducer.paramWidth,
      paramHeight: state.gameReducer.paramHeight
    }
  ),
 (dispatch) => (
    {
      onChangeOpt: (optvalue) => dispatch(ChangeOpt(optvalue)),
      onChangeInputW: (w) => dispatch(ChangeInput('width', w)),
      onChangeInputH: (h) => dispatch(ChangeInput('height', h))
    }
  )
)(OptionsGame);



const StartStopButton = connect(
  (state) => (
    {
      caption: state.gameReducer.stage === READY || state.gameReducer.stage === COMPLETED ? 'Start' : 'Stop',
      timerID: state.gameReducer.timerID,
      visible: true
    }
  ),
  (dispatch) => (
    {
      dispatch
    }
  ),
  (propsFromState, propsFromDispatch, ownProps) => {
    const { timerID, caption } = propsFromState
    const { dispatch } = propsFromDispatch
    return {
      ...propsFromState,
      ...propsFromDispatch,
      onClick: caption === 'Start' ? () => dispatch(StartGame(dispatch, timerID)) : () => dispatch(StopGame(timerID)) }
  }
)(GameButton);

const PauseResumeButton = connect(
  (state) => (
    {
      caption: state.gameReducer.stage === INPROGRESS ? 'Pause' : 'Resume',
      timerID: state.gameReducer.timerID,
      visible: state.gameReducer.stage === INPROGRESS || state.gameReducer.stage === PAUSED ? true : false

    }
  ),
  (dispatch) => (
    {
      dispatch
    }
  ),
  (propsFromState, propsFromDispatch, ownProps) => {
    const { timerID, caption } = propsFromState
    const { dispatch } = propsFromDispatch
    return {
      ...propsFromState,
      ...propsFromDispatch,
      onClick: caption === 'Pause' ? () => dispatch(PauseGame(dispatch)) :
        () => dispatch(ResumeGame(timerID))
    }
  }
)(GameButton);

const ConnectedTimer = connect(
  (state) => (
    {
      elapsed: state.gameReducer.elapsed,
      visible: state.gameReducer.stage !== READY,
      moves: state.gameReducer.moves
    }
  )
)(TimerGame);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Game15</h1>
          </header>
          <div className="panelGame">

            <div className="ConnectedField">
              <ConnectedField />
            </div>
            <div className="panelInfo">
              <ConnectedOptionsGame/>
              <div className="panelBtn">
                <StartStopButton/>
                <PauseResumeButton/>
              </div>
              <div className="panelTimer">
                <ConnectedTimer />
              </div>
            </div>
          </div>

        </div>
      </Provider>
    );
  }
}

export default App;

