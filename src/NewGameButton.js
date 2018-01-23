import React, { Component } from 'react';
import './App.css';

export class GameButton extends Component {
    render () {    
      const { onClick, caption, visible } = this.props;

      return(    
        <span className={visible ? "NewGameButton" : "display_none"} onClick={onClick}>
          {caption}
        </span>
      );      
    }
}