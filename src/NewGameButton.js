import React, { Component } from 'react';
import './App.css';

export class NewGameButton extends Component {
    render () {    
      const { onNewGame } = this.props;

      return(    
        <span className="NewGameButton" onClick={onNewGame}>
          New Game
        </span>
      );      
    }
}