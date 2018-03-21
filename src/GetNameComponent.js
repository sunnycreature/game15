import React, { Component } from 'react';
import './App.css';

export class GetNameComponent extends Component {
  render() {
    const { onSetTopName, onCloseInputNameDlg, visible} = this.props; 

    if (!visible) return null;

    return(
      <div className="modal">
        <div className="modal-content">
          <span>Введите ваше имя:</span>
          <input
            type="text"
            ref={(input) => { this.textInput = input; }} 
          />
        </div>
        <div className="modal-footer">
          <div 
            className="btn" 
            onClick={ 
              () => {
                if (this.textInput) {
                  onSetTopName(this.textInput.value);
                }   
              }  
            }
          >
            OK
          </div>
          <div 
            className="btn" 
            onClick={onCloseInputNameDlg}
          >
            Cancel
          </div>          
        </div>
      </div>    
    )
  }
} 



  