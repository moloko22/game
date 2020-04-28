import React, {useState} from 'react';
import connect from 'react-redux/lib/connect/connect.js';

function generateMods(obj){
  const ObjKeys = Object.keys(obj);
  return ObjKeys.map(key => {
    return <option key={key} value={key}>{key}</option>
  })
}

function GameSettings(props){
  const [mode, onChangeMode] = useState('');
  const [name, onChangeName] = useState('');
  const onClickHandle = function(fn1, arr, fn2){
    new Promise(function (resolve, reject) {
      resolve()
    }).then(fn => fn1(arr))
    .then(fn => fn2());
  }
  return(
    <form onSubmit={(event) => event.preventDefault()} className='game_settings_form'>
        <select onChange={(e) => onChangeMode(e.target.value)}
                defaultValue={'Pick game mode'}
                required>
                <option disabled value={'Pick game mode'}>Pick game mode</option>
                {generateMods(props.modes)}
        </select>
        <input placeholder='Enter Your Name'
                required
                onChange={(e) => onChangeName(e.target.value)}/>
        <button  disabled={!name || !mode || props.isPlaying}
                data-is-playing={'Игра уже начата!'}
                data-invalid={'Заполните все поля!'}
                className={props.isPlaying ? 'game_started' : ''}
                onClick={() => onClickHandle(props.changeSettings, [mode, name], props.startGame)}>{props.buttonText}</button>
    </form>
  )
};
const mapStateToProps = state => ({
  modes: state.modes,
  buttonText: state.settings.buttonText,
  userName: state.settings.userName,
  isPlaying: state.settings.isPlaying,
  currentMode: state.settings.currentMode,
})
const mapDispatchToProps = dispatch => ({
  changeSettings: (arr) => dispatch({type: 'START_GAME', payload: {currentMode: arr[0], userName: arr[1]}}),
})
export default connect(mapStateToProps, mapDispatchToProps)(GameSettings);
