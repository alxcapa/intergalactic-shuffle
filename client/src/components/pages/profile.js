import React, { Component } from "react";
import Banner from "../banner/banner";
import Assistant from "../assistant/assistant";
import Menu from "../menu/menu";
import Logout from "../logout-btn";
import BlocProfile from "../profile/bloc-profile";
import apiRequests from "../api-requests";

export default class Profile extends Component {
  state = { data: null };

  getData() {
    setTimeout(() => {
      console.log("timed");
      apiRequests.profile().then((response) => {
        this.setState({ data: response });
        console.log("data-prof", response);
        console.log("state", this.state.data);
      }, 1000);
    });
  }

  componentDidMount() {
    this.getData();
    
  }

  render() {
    console.log("state===>", this.state.data);
    return (
      <div className="globalContainer">
        <div className="first">
          <Banner />
          <Logout />
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
