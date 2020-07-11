import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CustomHeader from './components/CustomHeader/CustomHeader'
import Home from './views/Home'
import Settings from './views/Settings'

function App() {
  return (
    <div className="App">
      <Router>
          <CustomHeader/>
            <div className="main-layout">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/settings">
                <Settings />
              </Route>
            </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
