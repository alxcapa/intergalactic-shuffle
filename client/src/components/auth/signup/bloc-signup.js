
import React, { Component } from 'react';
import authService from '../auth-service'

export default class BlocSignup extends Component {


  state = {

    username: "",
    email: "",
    location: "",
    password: "",

    error: ""
  }

  handleSubmit = (event) => {
    event.preventDefault();

    authService.signup(this.state.username, this.state.email, this.state.location, this.state.password)
      .then(response => {
        this.setState({ error: "" });
        console.log("api reponse", response)

        this.props.history.push('/login');
      })
      .catch(err => this.setState({ error: err.response }))
      ;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  render() {
    return (
      <div className="bloc-login">
        <form onSubmit={this.handleSubmit} className="login-form">

          <label>
            USERNAME
        </label>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>

          <label>
            EMAIL
        </label>
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange}></input>

          <label>
            LOCATION
        </label>
          <input type="text" name="location" value={this.state.location} onChange={this.handleChange}></input>

          <label>
            PASSWORD
        </label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>

          <div className="btn-form" onClick={this.handleSubmit}>  <span>SIGNUP</span></div>
        </form>
      </div>
    )
  }
}


