export function getWinnersData(){
  return dispatch => {
    return fetch('https://starnavi-frontend-test-task.herokuapp.com/winners')
    .then(res => res.json())
    .then(data => {
      dispatch({type: 'FETCH_WINNERS_DATA', payload: data});
    })
  }
}
export function getSettingsData(){
  return dispatch => {
    return fetch('https://starnavi-frontend-test-task.herokuapp.com/game-settings')
    .then(res => res.json())
    .then(data => {
      dispatch({type: 'FETCH_MODES', payload: data});
    })
  }
}

export function sendWinnerData(data){
  return dispatch => {
    return fetch('https://starnavi-frontend-test-task.herokuapp.com/winners', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
  }
}
