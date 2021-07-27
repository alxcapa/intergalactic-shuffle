import React from 'react';
import Banner from '../banner/banner'
import Assistant from "../assistant/assistant"
import Menu from "../menu/menu"
import Logout from "../logout-btn"
import BlocProfile from "../profile/bloc-profile"


function Profile() {

  return (<div className="globalContainer">
    <div className="first">
      <Banner />
      <Logout />
    </div>

    <div className="second">
      <Menu />
      <BlocProfile />

    </div>

    <div className="third">
      <Assistant />
    </div>


  </div>)

}

export default Profile