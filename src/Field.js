import React, { Component } from 'react';
import classNames from 'classnames';
import './App.css';
import { READY, PAUSED } from './const';

export class Field extends Component {

  render() {
    const { fld, onCellClick, stage, onGetCellClass, widthCell} = this.props;
    
    const ch = fld.length;
    const cw = fld[0].length;
    const lines = [];
    let h = 0;
    let y = 0;
    let x = 0;
    for (let i = 0; i < ch; i++)
      {
        const line = [];
        for (let j = 0; j < cw; j++)
        {
          const classCell = onGetCellClass(fld[i][j], fld[0].length);
          h = (fld[i][j]-1)/cw; 
          h = (h - h%1);       
          y = -h*widthCell;          
          x = widthCell-(fld[i][j] - h*ch)*widthCell;
          var CellStyle = {backgroundPosition: classCell.substr(0,5) === 'CellP' && !(!fld[i][j] || stage === READY) && !(stage === PAUSED) ? 
          x + `px ` + y + `px` : `0px 0px`};
          line.push(
            <div className={classNames('Cell ' + classCell, {Empty: !fld[i][j] || stage === READY, Paused: stage === PAUSED})} key={j} onClick={ () => onCellClick(j, i) }
              style={CellStyle}>             
              <span >
                {classCell  ? ''  : fld[i][j]}
              </span>
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
