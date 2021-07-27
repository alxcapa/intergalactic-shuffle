import React from 'react';
import Banner from '../banner/banner'
import Assistant from "../assistant/assistant"
import Menu from "../menu/menu"
import Logout from "../logout-btn"
import BlocLogin from "../auth/login/bloc-login"


function Login() {

  return (<div className="globalContainer">
    <div className="first">
      <Banner />
      <Logout />
    </div>

    <div className="second">
      <Menu />
      <BlocLogin />
   
    </div>
    <div className='third'>   <Assistant /></div>




  </div>)

}

export default Login