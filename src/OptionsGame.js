import React, { Component } from 'react';
import './App.css';
import {InputComponent} from './InputComponent'

export class OptionsGame extends Component {
    render () {
      const { selectedOption, visible, onChangeOpt, paramWidth, paramHeight, onChangeInputW, onChangeInputH} = this.props;

      return(
        <div className={visible ? "panelOptions" : "display_none"}>
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
          <div className="optionWH">
            <InputComponent AttrName="Ширина:" paramValue={paramWidth} onChangeInput={onChangeInputW}/>
            <InputComponent AttrName="Высота:" paramValue={paramHeight} onChangeInput={onChangeInputH}/>
          </div>
        </div>
      );
    }
}

/*<InputComponent AttrName="Высота:" paramValue={paramHeight} onChangeInput={onChangeInput}/> */