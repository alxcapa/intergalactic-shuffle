import React from 'react';
import { Link } from 'react-router-dom'

function Menu() {

  return (<nav className="menu">
    <ul>
      <Link to="/profile"><li> Profile</li></Link>
      <Link to="/stats"><li> Stats</li></Link>
      <Link to="/ranking"><li> Leaderboard</li></Link>
      <Link to="/about"><li> About</li></Link>
    </ul>
  </nav>)

}

export default Menu