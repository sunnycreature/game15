import React, { Component } from 'react';
import './App.css';
import {Field} from './Field';
import { Provider, connect } from 'react-redux';
import { store } from './store';
import { GameButton } from './NewGameButton'
import { OptionsGame } from './OptionsGame'
import { TimerGame } from './TimerGame'
import { PuzzleInfo } from './PuzzleInfo';
import { CellClick, StartGame, StopGame, PauseGame, ResumeGame, ChangeOpt, ChangeSize, SetTopName, CloseInputNameDlg } from './actions'
import { READY, INPROGRESS, PAUSED, COMPLETED, INPUT_TOP_NAME } from './const.js'
import { TopNameComponent } from './TopNameComponent';
import { GetNameComponent } from './GetNameComponent.js';

const ConnectedField = connect(
  (state) => (
    {
      fld: state.gameReducer.field,
      stage: state.gameReducer.stage,
      onGetCellClass: state.gameReducer.selectedOption === 'numbers' ? (v, w) => '' :
        state.gameReducer.selectedOption === 'figures' ?
        (v, w) => {
          const x = v/w; 
          return 'Cell' + (x - x%1 + (x%1 === 0 ? 0 : 1));           
        } :
        (v, w) => {
             return 'CellP' + w;
        },
      fileImgName: state.gameReducer.fileImgName,
      widthCell: state.gameReducer.widthCell
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
      paramWidth: state.gameReducer.field[0].length,
      paramHeight: state.gameReducer.field.length
    }
  ),
 (dispatch) => (
    {
      onChangeOpt: (optvalue) => dispatch(ChangeOpt(optvalue)),
      onChangeSize: (sizevalue) => dispatch(ChangeSize(sizevalue))
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

const ConnectedPuzzleInfo = connect(
  (state) => (
    {
      visible: state.gameReducer.stage !== READY && state.gameReducer.selectedOption === 'puzzle',
      paramSize: state.gameReducer.field[0].length,
    }
  )
)(PuzzleInfo);

const ConnectedTopName = connect(
  (state) => (
    {
      w: state.gameReducer.field.length,
      selectedOption: state.gameReducer.selectedOption,
      top10: state.gameReducer.top10
    }
  )
)(TopNameComponent);

const ConnectedGetName = connect(
  (state) => (
    {
      visible: state.gameReducer.stage === INPUT_TOP_NAME
    }
  ),
 (dispatch) => (
    {
      onSetTopName: (namevalue) => dispatch(SetTopName(namevalue)),
      onCloseInputNameDlg: () => dispatch(CloseInputNameDlg())
    }
  )
)(GetNameComponent);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <ConnectedGetName/>
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
              <div className="optionPuzzleInfo">    
                <ConnectedPuzzleInfo />    
              </div>  
            </div>
            <div className="panelTopName">    
              <ConnectedTopName />    
            </div>                             
          </div>

        </div>
      </Provider>
    );
  }
}

export default App;

