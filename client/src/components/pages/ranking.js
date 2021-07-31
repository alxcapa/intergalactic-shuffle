import React, { Component } from "react";
import Banner from "../banner/banner";
import Assistant from "../assistant/assistant";
import Menu from "../menu/menu";
import Logout from "../logout-btn";
import BlocRanking from "../ranking/bloc-ranking";
import apiRequests from "../api-requests";

export default class Ranking extends Component {

  

  render() {
    console.log('this===>')
    apiRequests.ranking()
    .then((score)=>{
      console.log('this===>', score)
    })
    .catch((err)=>{
      console.error(err);
    })

    return (
      <div className="globalContainer">
        <div className="first">
          <Banner />
          <Logout />
        </div>
        <div className="second">
          <Menu />
          <BlocRanking />
        </div>
        <div className="third">
          {" "}
          <Assistant />
        </div>
      </div>
    );
  }
}
