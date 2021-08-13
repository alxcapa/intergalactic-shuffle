
import React, { Component } from 'react'
import Banner from "../banner/banner";
import Assistant from "../assistant/assistant";
import Menu from "../menu/menu";
import Logout from "../logout-btn";
import BlocStats from "../statistiques/bloc-statistiques"
import apiRequests from "../api-requests";


export default class Stats extends Component {

  state = { stat: null };

  getData() {

    apiRequests.stats().then((response) => {
      this.setState({ stat: response });


    });
  }

  componentDidMount() {
    this.getData();

  }


  render() {

    return (
      <div className="globalContainer">
        <div className="first">
          <Banner />
          <Logout updateUser={this.props.updateUser} />
        </div>

        <div className="second">
          <Menu />

          <BlocStats dataStats={this.state.stat} />

        </div>
        <div className="third"> <Assistant /></div>
      </div>
    )
  }
}




