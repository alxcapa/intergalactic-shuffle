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
    title.play()
  
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
    // demoTune.play()
 
    return (
      <Route render={props => (
        <div className="App" data-route={props.location.pathname}>
          <Switch>
            <Route exact path="/" render={(props) => <Game updateUser={this.updateLoggedInUser} session={this.state.user} history={props.history} />} />
            <Route path="/about" render={(props) => <About updateUser={this.updateLoggedInUser} history={props.history} />} />
            <Route exact path="/signup" render={(props) => <Signup updateUser={this.updateLoggedInUser} history={props.history} />} />
            <Route exact path="/login" render={(props) => <Login updateUser={this.updateLoggedInUser} session={this.state.user} history={props.history} />} />
            <Route exact path="/profile" render={(props) => <Profile updateUser={this.updateLoggedInUser} session={this.state.user} history={props.history} />} />
            <Route exact path="/stats" render={(props) => <Stats updateUser={this.updateLoggedInUser} history={props.history} />} />
            <Route exact path="/ranking-game" render={(props) => <Ranking updateUser={this.updateLoggedInUser} history={props.history} />} />
          </Switch>
        </div>
      )} />
    );
  }
}
let title = new Audio("images/Title.wav")
let demoTune = new Audio("images/demoTune.wav")


