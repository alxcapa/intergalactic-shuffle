import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import authService from "../components/auth/auth-service"

export default class Logout extends Component {


  handleLogout = (event) => {

    event.preventDefault();

    authService.logout()
      .then(response => {

        console.log("api reponse", response)

        // this.props.history.push('/login');
      })
      .catch(err => console.log(err.response))
      ;
  }

  render() {
    return (
      <div className="logout-btn" onClick={this.handleLogout}>Logout</div>
    )
  }
}




