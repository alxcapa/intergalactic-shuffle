import React, { Component } from "react";
import Banner from "../banner/banner";
import Assistant from "../assistant/assistant";
import Menu from "../menu/menu";
import Logout from "../logout-btn";
import BlocProfile from "../profile/bloc-profile";
import apiRequests from "../api-requests";
import { Redirect } from "react-router-dom";

export default class Profile extends Component {
  state = { data: null };

  getData() {
    apiRequests.profile().then((response) => {
      this.setState({ data: response });
      console.log("data-prof", response);
      console.log("state", this.state.data);
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    if (!this.props.session) {

      return <Redirect to="/login" />;

    } else {

      return (
        <div className="globalContainer">
          <div className="first">
            <Banner />
            <Logout checkSession={this.props.disco} />
          </div>

          <div className="second">
            <Menu />
            <BlocProfile dataProfile={this.state.data} />
          </div>

          <div className="third">
            <Assistant />
          </div>
        </div>
      );

    }

  }
}
