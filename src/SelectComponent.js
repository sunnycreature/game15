import React, { Component } from 'react';
import './App.css';

export class SelectComponent extends Component {

  render() {
    const { paramSize, onChangeSize} = this.props;
    return (
      <div>
        <span>
          Размер поля:
        </span>  
        <select value={paramSize} onChange={(e) => onChangeSize(e.target.value)}>
            <option value="size4">4x4</option>
            <option value="size5">5x5</option>
            <option value="size6">6x6</option>
        </select>
      </div>
    )
  }
}