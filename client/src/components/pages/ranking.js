import React from "react";
import Banner from "../banner/banner";
import Assistant from "../assistant/assistant";
import Menu from "../menu/menu";
import Logout from "../logout-btn";
import BlocRanking from "../ranking/bloc-ranking";

function Ranking() {
  return (
    <div className="globalContainer">
      <div className="first">
        <Banner />
        <Logout />
      </div>

      <div className="second">
        <Menu />

        <BlocRanking/>

      </div>
      <div className="third"> <Assistant /></div>
    </div>
  );
}

export default Ranking;
