import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Field} from './Field';
import { Provider, connect } from 'react-redux';
import { store } from './store';
import { GameButton } from './NewGameButton'
import { TimerGame } from './TimerGame'
import { CellClick, StartGame, StopGame, PauseGame, ResumeGame } from './actions'
import { READY, INPROGRESS, PAUSED, COMPLETED } from './const.js'

const ConnectedField = connect(
  (state) => (
    {
      fld: state.gameReducer.field,
      stateCell: state.gameReducer.stage === INPROGRESS ? 1 : state.gameReducer.stage === PAUSED || state.gameReducer.stage === COMPLETED ? 2 : 0 
    }
  ),
  (dispatch) => (
    {
      onCellClick: (x, y) => dispatch(CellClick(x, y))
    }
  )
)(Field);  

const StartStopButton = connect(
  (state) => (
    {
      caption: state.gameReducer.stage === READY || state.gameReducer.stage === COMPLETED ? 'Start' : 'Stop',
      timerID: state.gameReducer.timerID,
      visible: true,      
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
      visible: state.gameReducer.stage === INPROGRESS || state.gameReducer.stage === PAUSED ? true : false,
    
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

/*
                <!-- <ConnectedTimer /> -->

*/