import React from 'react';
import Logo from "./logo"
import Title from "./title"
import { Link } from 'react-router-dom'

function Banner() {

  return (<header className="banner">
    <Link className="banner-flex" to="/">
      <Title />
      <Logo />
    </Link>
  </header>)

}

export default Banner