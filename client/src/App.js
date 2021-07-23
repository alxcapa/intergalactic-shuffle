
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Game from "./components/pages/game"



function App() {
  return (
    <div className="App">
      <Switch>

        <Route exact path="/game" render={() => <Game />} />
        <Route exact path="/about" render={() => <div>ABOUT</div>} />
        <Route exact path="/signup" render={() => <div>SIGNUP</div>} />
        <Route exact path="/login" render={() => <div>LOGIN</div>} />
        <Route exact path="/logout" render={() => <div>LOGOUT</div>} />
        <Route exact path="/profile" render={() => <div>PROFILE</div>} />
        <Route exact path="/stats" render={() => <div>STATS</div>} />
        <Route exact path="/ranking-game" render={() => <div>RANKING GAME</div>} />

      </Switch>

    </div>
  );
}

export default App;
