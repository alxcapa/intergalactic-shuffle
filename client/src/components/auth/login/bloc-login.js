
import React, { Component } from 'react';
import authService from '../auth-service'

export default class BlocLogin extends Component {


  state = {
    email: "",

    password: "",


    error: ""
  }

  handleSubmit = (event) => {
    event.preventDefault();

    authService.login(this.state.email, this.state.password)
      .then(response => {
        this.setState({ error: "" });
        console.log("api reponse", response)

        // this.history.push('/');
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
            EMAIL
        </label>
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange}></input>

          <label>
            PASSWORD
        </label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
          <div className="btn-form" onClick={this.handleSubmit}> <span>LOGIN</span></div>
          <div className="btn-form"> <span>SIGNUP</span></div>
        </form>
      </div>
    )
  }
}


