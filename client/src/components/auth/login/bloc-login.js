
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
    console.log("on y passe")
    event.preventDefault();

    authService.login(this.state.email, this.state.password)
      .then(response => {
        this.setState({ error: "" });
        this.setState({ logged: true });

        this.props.updateUser(response)

        console.log("response", response)
        console.log("history", this.props.history)
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ error: err.response });
        console.log("erreur", err)
      })
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
          <h2>LOGIN</h2>
          <label>
            EMAIL
        </label>
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange}></input>

          <label>
            PASSWORD
        </label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
          <button className="btn-form"><span>LOGIN</span></button>
          <Link to="/signup" className="btn-form"> <span>SIGNUP</span></Link>


        </form>

      </div>
    )
  }
}


