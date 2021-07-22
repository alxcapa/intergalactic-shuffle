import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import globalContainer from './components/global-container'

function App() {
  return (
    <div className="App">
      <Switch>

        <Route exact path="/game" />
        <Route exact path="/about" />
        <Route exact path="/signup" />
        <Route exact path="/login" />
        <Route exact path="/logout" />
        <Route exact path="/profile" />
        <Route exact path="/stats" />
        <Route exact path="/ranking-game" />

      </Switch>

    </div>
  );
}

export default App;
