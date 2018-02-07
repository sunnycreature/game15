import React, { Component } from 'react';
import './App.css';

export class InputComponent extends Component {

  render() {
    const { AttrName, paramValue, onChangeInput} = this.props;
    return (
      <div className="InputComponent">
        <span>
          {AttrName}
        </span>
        <input type="text" defaultValue={paramValue} onchange={(e) => onChangeInput(e.target.value)}/>
      </div>
    )
  }
}