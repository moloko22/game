import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect.js';

import {getWinnersData, getSettingsData, sendWinnerData} from '../../store/middleware/middleware.js'
import './Main.css';
import GameField from '../GameField/GameField.jsx';
import LeaderBoard from '../LeaderBoard/LeaderBoard.jsx';

class Main extends Component {
  componentDidMount() {
    this.props.getWinners();
    this.props.getSettingsData();
  }
    drawBlock(parentElement, childElements, num, objMap, time, count, idVal){
    const moreThanHalf = (num/2)%2 === 0 ? num/2+1 : Math.round(num/2);
    const randomNum = Math.floor(Math.random() * Math.floor(num));
    if(count.user === count.computer && count.user + count.copunter === num){
      console.log('Ничья');
      console.log('Или ошибка...');
      clearInterval(idVal);
      this.props.gameIsOver({winner: 'TIE', payload: 'NOT TODAY'});
    }
    if(count.user === moreThanHalf || count.computer === moreThanHalf){
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const dayInMonth = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const winner = count.user > count.computer ? this.props.settings.userName : 'computer';
      const months = ['Junuary', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octpber', 'November', 'December'];
      const validateMinutes = (minutes + '').length === 2 ? minutes : '0' +minutes;
      const resultDate = dayInMonth + " " + months[month] + " " + year + " " + hours + ":" + validateMinutes;
      this.props.gameIsOver({winner: winner})
      new Promise(function(resolve, rejetc){
        resolve()
      })
      .then(fn1 => this.props.sendWinnerData({winner: winner, date: resultDate}))
      .then(fn2 => this.props.getWinners())
      clearInterval(idVal);
      return;
    }
    if(objMap[randomNum]){
      return this.drawBlock(parentElement, childElements, num, objMap, time, count, idVal);
    }
    objMap[randomNum] = randomNum;
    childElements[randomNum].classList.add('blue');
    function handleClick(event){
      event.target.classList.remove('blue');
      event.target.classList.add('green');
      count.user = count.user + 1;
    }
    childElements[randomNum].addEventListener('click', handleClick, {once: true});
    function timeoutHandle(){
      childElements[randomNum].removeEventListener('click', handleClick);
      childElements[randomNum].classList.remove('blue');
      childElements[randomNum].classList.add('red');
      if(!childElements[randomNum].classList.contains('green')){
        count.computer = count.computer + 1;
      }
    }
    setTimeout(timeoutHandle, time);
  }
  startGame = () =>{
    const {modes, settings} = this.props;
    const currentModeLength = modes[settings.currentMode].field;
    const num = currentModeLength*currentModeLength;
    const parentElement = document.getElementsByClassName('game_main_field')[0];
    parentElement.classList.add(`game_main_field_${currentModeLength}`);
    const childElements = document.getElementsByClassName('field');
    const objMap = {};
    const count  = {user: 0, computer: 0}
    const idVal = setInterval(() => {
      this.drawBlock(parentElement, childElements, num, objMap, modes[settings.currentMode].delay, count, idVal)
    }, modes[settings.currentMode].delay*2);
  }
  render() {
    return (
      <section className='main'>
        <GameField message={this.props.message}
                  modes={this.props.modes}
                  startGame={this.startGame}
                  settings={this.props.settings}
                  />
        <LeaderBoard items={this.props.winners}/>
      </section>
    );
  }

}

const mapStateToProps = state => ({
  message: state.message,
  winners: state.winners,
  modes: state.modes,
  settings: state.settings,
});
const mapDispatchToProps = dispatch => ({
  getWinners: () => dispatch(getWinnersData()),
  getSettingsData: () => dispatch(getSettingsData()),
  sendWinnerData: (obj) => dispatch(sendWinnerData(obj)),
  gameIsOver: (obj) => dispatch({type:'GAME_OVER', payload: obj})
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
