import React, { Component } from 'react';
import './App.css';
function GetTimeStr (elapsed) {
  var sec_num = Math.floor(elapsed / 1000);
  var sec_num_str = "0" + sec_num;
  sec_num_str = sec_num_str.substr(sec_num_str.length-2, 2); 
  var hours   = Math.floor(sec_num / 3600);
  var hours_str = "0" + hours;
  hours_str = hours_str.substr(hours_str.length-2, 2);     
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var minutes_str = "0" + minutes;
  minutes_str = minutes_str.substr(minutes_str.length-2, 2);   
  return  hours_str + ':' + minutes_str + ':' + sec_num_str
}
export class TopNameComponent extends Component {
  render() {
    const { top10 } = this.props; 
    top10.sort( (a, b) => a.elapsed - b.elapsed );
    return(
      <div className="topName">
        <div> Топ 10 </div>
        <table>
          <tr>
            <th>Имя игрока</th>
            <th>Время</th>
            <th>Шаги</th>
          </tr>  
          {
            top10.map(
              t => <tr><td>{t.player}</td><td>{t.elapsed}</td><td>{t.moves}</td></tr>
            )
          }
        </table>
      </div>
    )
  }
} 
