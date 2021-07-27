import React from 'react';

function BlocLogin() {

  return (<div className="bloc-login">
    <form className="login-form">
      <label>
        EMAIL
      </label>
      <input></input>
      <label>
        PASSWORD
      </label>
      <input></input>
      <div className="btn-form"> <span>LOGIN</span></div>
      <div className="btn-form"> <span>SIGNUP</span></div>
    </form>
  </div>)

}

export default BlocLogin