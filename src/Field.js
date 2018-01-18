import React, { Component } from 'react';
import './App.css';

export class Field extends Component {

  render() {
    const { fld, onCellClick, finished } = this.props;
    
    const ch = fld.length;
    const cw = fld[0].length;
    const lines = [];

    for (let i = 0; i < ch; i++)
      {
        const line = [];
        for (let j = 0; j < cw; j++)
        {
          line.push(
            <div className={fld[i][j] ? "Cell" : "Cell Empty"} key={j} onClick={ () => onCellClick(j, i) }>
              <span>{fld[i][j]}</span>
            </div>
          );
        }
        lines.push(
          <div className="Line" key={i}>
          {line}
          </div>
        );
      }

    return(
      <div className="Field">
        {lines}
      </div>
    )
  }
} 