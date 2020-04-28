import React, { Component } from 'react';

import './LeaderBoard.css';

class LeaderBoard extends Component {
  createItems(arr){
    arr.reverse();
    return arr.map(elem => {
      const validateDate = elem.date.split(';');
      return (
        <li key={elem.id} >
          <p>{elem.winner}</p>
          <p>{`${validateDate[1] ? validateDate[1] : ''} ${validateDate[0]}`}</p>
        </li>
      )
    })
  }
  render() {
    return (
      <div className='leader_board'>
        <h3>Leader Board</h3>
        <ul className='leader_board_list'>
          {this.createItems(this.props.items)}
        </ul>
      </div>
    );
  }

}

export default LeaderBoard;
