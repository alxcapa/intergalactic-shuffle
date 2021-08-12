
import React, { Component } from 'react';
import { Link } from "react-router-dom"

import authService from '../auth-service'



export default class BlocLogin extends Component {


  state = {
    email: "",

    password: "",


    error: "",
    logged: false
  }

  handleSubmit = (event) => {

    event.preventDefault();

    authService.login(this.state.email, this.state.password)
      .then(response => {
        this.setState({ error: "" });
        this.setState({ logged: true });

        this.props.disco(this.state.logged)

        console.log("response", response)
        // this.props.history.push('/');
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
          <h2>Login</h2>
          <label>
            EMAIL
        </label>
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange}></input>

          <label>
            PASSWORD
        </label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
          <button className="btn-form" onClick={this.handleSubmit}><span>LOGIN</span></button>
          {/* <Link to="login" onClick={this.handleSubmit}>  <div className="btn-form" > <span>LOGIN</span></div></Link> */}
          <Link className="btn-form" to="/signup"> <div className="btn-form"> <span>SIGNUP</span></div></Link>

        </form>
      </div>
    )
  }
}


