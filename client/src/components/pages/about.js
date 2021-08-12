import React, { Component } from 'react'
import Banner from "../banner/banner";
import Assistant from "../assistant/assistant";
import Menu from "../menu/menu";
import Logout from "../logout-btn";
import BlocAbout from "../about/bloc-about";


export default class About extends Component {
  render() {
    return (
      <div className="globalContainer">
        <div className="first">
          <Banner />
          <Logout checkSession={this.props.disco} />
        </div>

        <div className="second">
          <Menu />

          <BlocAbout />
        </div>
        <div className='third'>
          <Assistant />
        </div>
      </div>
    )
  }
}



