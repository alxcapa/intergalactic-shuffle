import React, { Component } from 'react'
import authService from "../components/auth/auth-service"
import { Link } from 'react-router-dom'

export default class Logout extends Component {

  state = {
    connected: true
  }

  handleLogout = (event) => {

    event.preventDefault();

    authService.logout()
      .then(response => {

        // console.log("response", response)
        // this.setState({ connected: false })

        this.props.updateUser(response)


        console.log("state logout", this.state.connected)



        // this.props.history.push('/login');
      })
      .catch(err => console.log(err.response))
      ;
  }

  render() {

    return (
      <Link to="/login"><div className="logout-btn" onClick={this.handleLogout}>Logout</div></Link>
    )
  }
}




