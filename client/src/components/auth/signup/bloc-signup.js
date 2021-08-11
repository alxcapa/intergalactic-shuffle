
import React, { Component } from 'react';
import { Link } from "react-router-dom"
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
      <div className="bloc-signup">
        <form onSubmit={this.handleSubmit} className="signup-form">

          <label>
            USERNAME
        </label>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>

          <label>
            EMAIL
        </label>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange}></input>

          <label>
            LOCATION
        </label>
          <input type="text" name="location" value={this.state.location} onChange={this.handleChange}></input>

          <label>
            PASSWORD
        </label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>

          <Link to="/login" onClick={this.handleSubmit}><div className="btn-form"><span>SIGNUP</span></div></Link>

        </form>
      </div>
    )
  }
}


