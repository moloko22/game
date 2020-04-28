import React, { Component } from 'react';

import './GameField.css';
import GameSettings from '../GameSettings/GameSettings.jsx';
import GameMainField from '../GameMainField/GameMainField.jsx';

class GameField extends Component {
  render() {
        return(
        <div className={'main_field'}>
          <GameSettings startGame={this.props.startGame} className={'game_settings_form'}/>
          <h4>{this.props.settings.isPlaying ? null : this.props.message}</h4>
          <GameMainField modes={this.props.modes}
                         settings={this.props.settings}/>
        </div>)
  }
}

export default GameField;
