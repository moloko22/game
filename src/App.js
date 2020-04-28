import React from 'react';
import Provider from "react-redux/lib/components/Provider.js";

import store from '../src/store/store'
import './App.css';
import Main from './components/Main/Main.jsx';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
