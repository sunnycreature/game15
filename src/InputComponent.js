import React, { Component } from 'react';
import './App.css';

export class InputComponent extends Component {
  render() {
    const { AttrName } = this.props;
    return (      
      <div className="InputComponent">
        <span>
          {AttrName}
        </span> 
        <input type="text" onchange=""/>
      </div>
    )
  }
}