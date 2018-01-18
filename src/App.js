import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Field} from './Field';
import { Provider, connect } from 'react-redux';
import { store } from './store';
import { NewGameButton } from './NewGameButton'

const ConnectedField = connect(
  (state) => (
    {
      fld: state.gameReducer.field,
      finished: state.gameReducer.finished
    }
  ),
  (dispatch) => (
    {
      onCellClick: (x, y) => dispatch({type: 'CELL_CLICK', x, y})
    }
  )
)(Field);  

const ConnectedNewGameButton = connect(
  null,
  (dispatch) => (
    {
      onNewGame: () => dispatch({type: 'NEW_GAME'})
    }
  )
)(NewGameButton); 

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div className="panelGame">
           
            <div className="ConnectedField"> 
              <ConnectedField />
            </div>  
            <div className="panelButton">
              <ConnectedNewGameButton/>
            </div>             

          </div>  
          
        </div>
      </Provider>  
    );
  }
}

export default App;
