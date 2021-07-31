

import React, { Component } from "react";
import Banner from "../banner/banner";
import Assistant from "../assistant/assistant";
import Menu from "../menu/menu";
import Logout from "../logout-btn";
import BlocSignup from "../auth/signup/bloc-signup";

export default class Signup extends Component {
  render() {
    return (
      <div className="globalContainer">
        <div className="first">
          <Banner />
          <Logout />
        </div>

        <div className="second">
          <Menu />
          <BlocSignup />
        </div>

        <div className="third">
          <Assistant />
        </div>
      </div>
    );
  }
}
