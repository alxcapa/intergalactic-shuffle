
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Game from "./components/pages/game"
import Login from "./components/pages/login"
import About from "./components/pages/about"
import Ranking from './components/pages/ranking'
import Profile from "./components/pages/profile"



function App() {
  return (
    <div className="App">
      <Switch>

        <Route exact path="/" render={() => <Game />} />
        <Route exact path="/about" render={() => <About />} />
        <Route exact path="/signup" render={() => <div>SIGNUP</div>} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/logout" render={() => <div>LOGOUT</div>} />
        <Route exact path="/profile" render={() => <Profile />} />
        <Route exact path="/stats" render={() => <div>STATS</div>} />
        <Route exact path="/ranking" render={() => <Ranking />} />

      </Switch>

    </div>
  );
}

export default App;
