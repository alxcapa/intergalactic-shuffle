import React, { Component } from "react";
import Banner from "../banner/banner";
import Assistant from "../assistant/assistant";
import Menu from "../menu/menu";
import Logout from "../logout-btn";
import BlocRanking from "../ranking/bloc-ranking";
import apiRequests from "../api-requests";

export default class Ranking extends Component {

  state = { rank: null };

  getData() {

    apiRequests.ranking()
      .then((response) => {
        this.setState({ rank: response });
      })

  }

  componentDidMount() {
    this.getData();

  }

  render() {

    return (
      <div className="globalContainer">
        <div className="first">
          <Banner />
          <Logout checkSession={this.props.disco} />
        </div>
        <div className="second">
          <Menu />
          <BlocRanking dataRank={this.state.rank} />
        </div>
        <div className="third">
          <Assistant />
        </div>
      </div>
    );
  }
}
