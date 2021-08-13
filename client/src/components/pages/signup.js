

import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import Banner from "../banner/banner";
import Assistant from "../assistant/assistant";
import Menu from "../menu/menu";
import Logout from "../logout-btn";
import BlocSignup from "../auth/signup/bloc-signup";

export default class Signup extends Component {
  render() {

    if (!this.props.session) {
      return (
        <div className="globalContainer">
          <div className="first">
            <Banner />
            <Logout updateUser={this.props.updateUser} />
          </div>

          <div className="second">
            <Menu />
            <BlocSignup history={this.props.history} />
          </div>

          <div className="third">
            <Assistant />
          </div>
        </div>
      );
    }
    else {
      return <Redirect to="/" />;
    }


  }
}
