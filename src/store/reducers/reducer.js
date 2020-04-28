const initialState = {
  winners: [],
  modes: {},
  settings: {
    buttonText: 'Play',
    userName: '',
    currentMode: '',
    isPlaying: false
  },
  message: '',
};

export default function reducer(state = initialState, action){
  switch(action.type){
    case 'FETCH_WINNERS_DATA': {
      const newState = Object.assign({}, state);
      newState.winners = action.payload;
      return newState;
    }
    case 'FETCH_MODES': {
      const newState = Object.assign({}, state);
      newState.modes = action.payload;
      return newState;
    }
    case 'START_GAME': {
      const newState = Object.assign({}, state);
      newState.settings = action.payload;
      newState.settings.isPlaying = true;
      newState.settings.buttonText = 'Play';
      return newState;
    }
    case 'GAME_OVER': {
      const newState = Object.assign({}, state);
      newState.message = action.payload.winner + ' win!'
      newState.settings.isPlaying = false;
      newState.settings.buttonText = 'PLAY AGAIN';
      return newState;
    }
    default: return state;
  }
};
