import React, { Component } from 'react';
import classNames from 'classnames';
import './App.css';
import { READY, PAUSED } from './const';

export class Field extends Component {

  render() {
    const { fld, onCellClick, stage, onGetCellClass, fileImgName, widthCell} = this.props;
    
    const ch = fld.length;
    const cw = fld[0].length;
    const lines = [];
    //const wCol = 104;

    for (let i = 0; i < ch; i++)
      {
        const line = [];
        for (let j = 0; j < cw; j++)
        {
          const classCell = onGetCellClass(fld[i][j], fld[0].length);
          let h = fld[i][j]/cw; 
          h = (h - h%1);       
          let y = -h*widthCell;          
          let x = -(fld[i][j] - h*ch)*widthCell;
          var CellStyle = {backgroundPosition: classCell === 'CellP' && !(!fld[i][j] || stage === READY) && !(stage === PAUSED) ? 
          x + `px ` + y + `px` : `0px 0px`
          /*fld[i][j] === 1 ? `0px 0px` :
          fld[i][j] === 2 ? `-104px 0px` : 
          fld[i][j] === 3 ? `-208px 0px` : 
          fld[i][j] === 4 ? `-312px 0px` : 
          fld[i][j] === 5 ? `0px -104px` :
          fld[i][j] === 6 ? `-104px -104px` : 
          fld[i][j] === 7 ? `-208px -104px` : 
          fld[i][j] === 8 ? `-312px -104px` : 
          fld[i][j] === 9 ? `0px -208px` :
          fld[i][j] === 10 ? `-104px -208px` : 
          fld[i][j] === 11 ? `-208px -208px` : 
          fld[i][j] === 12 ? `-312px -208px` : 
          fld[i][j] === 13 ? `0px -312px` :
          fld[i][j] === 14 ? `-104px -312px` : 
          fld[i][j] === 15 ? `-208px -312px` : 
          fld[i][j] === 16 ? `-312px -312px` : `0px 0px`
            : `0px 0px`*//*,
        backgroundImage: "url(" + {fileImgName}  + ")"*/};
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

/*fld[i][j] && stateCell === 1 ? "Cell" : fld[i][j] && stateCell === 2 ? "Cell Paused" : "Cell Empty"} key={j} onClick={ () => onCellClick(j, i) } */
/*              <span style={{backgroundPosition: classCell === 'CellP' && fld[i][j] === 1 ? `0px` : 
                classCell === 'CellP' && fld[i][j] === 2 ? `106px` : '0px'}}>
                {classCell || classCell === 'CellP' ? ''  : fld[i][j]}
              </span> */ /*style={{backgroundPosition: classCell === 'CellP' ? 
                switch(fld[i][j]) {
                  case 1:
                    return `0px 0px`;
                    break;
                  case 2:
                    return  `106px 0px` ;
                    break;
                  case 3:
                    alert( 'Перебор' );
                    break;
                  default:
                    alert( 'Я таких значений не знаю' );
                }


                fld[i][j] === 1 ? `0px 0px` : 
                fld[i][j] === 2 ? `106px 0px` : 
                fld[i][j] === 3 ? `212px 0px` :
                fld[i][j] === 4 ? `318px 0px` 
                : '0px'}}>*/