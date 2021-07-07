import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './style/style.scss'
import { MainApp } from './pages/MainApp/MainApp';
// import {Login} from './pages/Login/Login'
function App() {

  return (
    <div className="App ">
      <Switch>
      <Route component={MainApp} path="/" />
        {/* <Route component={Login} exact path="/" /> */}
      </Switch>
      {/* <Footer/> */}
    </div>

  );
}

export default App;

