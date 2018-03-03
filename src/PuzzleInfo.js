import React, { Component } from 'react';
import './App.css';
import classNames from 'classnames';

export class PuzzleInfo extends Component {

  render() {
    const { visible, paramSize} = this.props;
    return (
      <div className = {classNames('PuzzleInfo', {NoneDisplay: !visible})}>
        <div className={paramSize === 4 ? "PuzzleImg4" : paramSize === 5 ? "PuzzleImg5" : "PuzzleImg6"}  >
        </div>
      </div>
    )
  }
}