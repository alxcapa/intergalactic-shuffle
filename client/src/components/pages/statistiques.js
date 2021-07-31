import React from "react";
import Banner from "../banner/banner";
import Assistant from "../assistant/assistant";
import Menu from "../menu/menu";
import Logout from "../logout-btn";
import BlocStats from "../statistiques/bloc-statistiques"



function Stats() {
  return (
    <div className="globalContainer">
      <div className="first">
        <Banner />
        <Logout />
      </div>

      <div className="second">
        <Menu />

        <BlocStats />

      </div>
      <div className="third"> <Assistant /></div>
    </div>
  );
}

export default Stats;
