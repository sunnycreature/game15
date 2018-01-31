import React, { Component } from 'react';
import './App.css';
import classNames from 'classnames';


export class TimerGame extends Component {
  render() {
    const { elapsed, visible, moves } = this.props;
    var sec_num = Math.floor(elapsed / 1000);
    var sec_num_str = "0" + sec_num;
    sec_num_str = sec_num_str.substr(sec_num_str.length-2, 2); 
    var hours   = Math.floor(sec_num / 3600);
    var hours_str = "0" + hours;
    hours_str = hours_str.substr(hours_str.length-2, 2);     
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var minutes_str = "0" + minutes;
    minutes_str = minutes_str.substr(minutes_str.length-2, 2);      
    //var seconds = sec_num - (hours * 3600) - (minutes * 60);    
    return (
      <div className = {classNames('TimerGame', {NoneDisplay: !visible})}>
        <div>Таймер:   {hours_str}:{minutes_str}:{sec_num_str}</div>
        <div>Сделано шагов: {moves}</div>        
      </div>  
    )
  }  
}