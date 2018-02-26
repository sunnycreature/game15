import React, { Component } from 'react';
import './App.css';
import {InputComponent} from './InputComponent'
import {SelectComponent} from './SelectComponent'

export class OptionsGame extends Component {
    render () {
      const { selectedOption, visible, onChangeOpt, paramWidth, paramHeight, onChangeInputW, onChangeInputH, paramSize, onChangeSize} = this.props;

      return(
        <div className={visible ? "panelOptions" : "display_none"}>
          <div className="optionType">
            <span>Вид игры:</span>
            <div className="radio">
              <label>
                <input type="radio" value="1" checked={selectedOption === 'numbers'} onChange={ () => onChangeOpt("numbers") }/>
                цифры
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="2" checked={selectedOption === 'figures'} onChange={ () => onChangeOpt("figures") }/>
                фигуры
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="3" checked={selectedOption === 'puzzle'} onChange={ () => onChangeOpt("puzzle") }/>
                пазл
              </label>
            </div>
          </div>
          <div className="optionSize">
            <SelectComponent paramSize={paramSize} onChangeSize={onChangeSize}/>
          </div>          
        </div>
      );
    }
}

/*          <div className="optionWH">
            <InputComponent AttrName="Ширина:" paramValue={paramWidth} onChangeInput={onChangeInputW}/>
            <InputComponent AttrName="Высота:" paramValue={paramHeight} onChangeInput={onChangeInputH}/>
          </div>*/