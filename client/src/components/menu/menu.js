import React from 'react';
import { Link } from 'react-router-dom'

function Menu() {

  return (<nav className="menu">
    <ul>
      <li> <Link to="/profile">Profile</Link> </li>
      <li> <Link to="/stats">Stats</Link></li>
      <li> <Link to="/ranking">Leaderboard</Link></li>
      <li> <Link to="/about">About</Link></li>
    </ul>
  </nav>)

}

export default Menu