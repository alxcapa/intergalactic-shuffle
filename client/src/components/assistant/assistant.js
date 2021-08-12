import React from 'react';
import Character from './3d-assistant'
import Talk from './talk-area'

function Assistant() {

  return (<div className="container-assistant">
  <div className="test-assistant"><Character /></div>
    
    <Talk />
  </div>)
}

export default Assistant