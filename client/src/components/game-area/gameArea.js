import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Sketch from 'react-p5'


function GameArea() {

  
  let a = 300;
  let b = 300;
  let a1 = 100;
  let b1 = 300;
  let speed = 3;
  let setup = (p5, canvasParentRef) => {
    let xyz = p5.createCanvas(540, 380).parent(canvasParentRef);
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    xyz.position(x, y);
  };



  let draw = (p5) => {
    p5.background("rgb(100%,100%,100%)");
    p5.stroke(1);
    p5.strokeWeight(4);
    p5.noFill();
    p5.ellipse(a, b, 100, 100);
    p5.ellipse(a, b, 50, 100);
    p5.ellipse(a, b, 100, 50);

    

    if (a >= p5.width) {
      speed = -3;
    }
    if (a === 30) {
      speed = 3;
    }
    a = a + speed;
  };

  return (
    <div>
      <Sketch setup={setup} draw={draw}  className='defaultCanvas0'  />
    </div>
  );
}





export default GameArea












