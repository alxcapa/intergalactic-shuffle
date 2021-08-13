import "./App.css";
import { Switch, Route } from "react-router-dom";
import Game from "./components/pages/game";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup"
import About from "./components/pages/about";
import Ranking from "./components/pages/ranking";
import Profile from "./components/pages/profile";
import authService from "./components/auth/auth-service";
import Stats from "./components/pages/statistiques"



import React, { Component } from "react";




export default class App extends Component {
  state = { user: false };

  componentDidMount() {
    if (this.state.user === false) {
      authService
        .loggedin()
        .then((data) => {



          console.log('user', data)
          this.setState({ user: data })
          console.log(this.state.user)
          console.log(this.state)
        })
        .catch((err) => {
          this.setState({ user: false });
        });
    }
  }

  updateLoggedInUser = (userObj) => {
    this.setState({
      user: userObj
    })
  }

  // enfantLoggedInUser = (userObj) => {

  //   if (!userObj) {
  //     this.setState({
  //       user: false
  //     })
  //   }
  //   else { }
  // }


  render() {
    return (
      <Route render={props => (
        <div className="App" data-route={props.location.pathname}>
          <Switch>
            <Route exact path="/" render={(props) => <Game disco={this.enfantLoggedInUser} session={this.state.user} history={props.history} />} />
            <Route path="/about" render={(props) => <About disco={this.enfantLoggedInUser} history={props.history} />} />
            <Route exact path="/signup" render={(props) => <Signup session={this.state.user} history={props.history} />} />
            <Route exact path="/login" render={(props) => <Login updateUser={this.updateLoggedInUser} session={this.state.user} history={props.history} />} />
            <Route exact path="/profile" render={(props) => <Profile disco={this.enfantLoggedInUser} session={this.state.user} history={props.history} />} />
            <Route exact path="/stats" render={(props) => <Stats disco={this.enfantLoggedInUser} history={props.history} />} />
            <Route exact path="/ranking-game" render={(props) => <Ranking disco={this.enfantLoggedInUser} history={props.history} />} />
          </Switch>
        </div>
      )} />
    );
  }
}
