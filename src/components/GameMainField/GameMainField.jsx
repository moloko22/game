import React, { Component } from 'react';

import './GameMainField.css';
class GameMainField extends Component {
  generateSingleBlock(i){
    return <div className={`game_main_field_${i} field`} key={i+Math.random()}></div>
  }
  generateArray(arr, times){
    const result = [];
    for(let i = 0; i < times; i++){
      result.push(arr);
    }
    return result;
  }
  generateMainField(modes, settings){
    const currentMode = settings.currentMode;
    const arrayOfResults = [];
    const currentModeFieldLength = modes[currentMode].field;
    for(let i = 0; i < currentModeFieldLength; i++){
      const element = this.generateSingleBlock(i);
      arrayOfResults.push(element);
    }
    return this.generateArray(arrayOfResults, currentModeFieldLength);
  }
  render() {
    const {modes, settings} = this.props;
    return (
      <div className={'game_main_field'}>
      {settings.currentMode ? this.generateMainField(modes, settings) : null}
      </div>
    );
  }

}

export default GameMainField;
