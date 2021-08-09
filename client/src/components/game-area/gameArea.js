import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import Sketch from "react-p5";
import * as ml5 from "ml5";

// FIRST WE ESTABLISH CLASSES
class Ball {
  constructor() {
    this.x = randomNum(140, 600);
    this.y = randomNum(50, 300);
    this.w = 50;
    this.h = 50;
  }
  draw(p5) {
    this.img = p5.loadImage("images/lune.png", (img) => {
      p5.image(img, this.x, this.y, this.w, this.h);
    });
  }
}
class BallOne extends Ball {
  constructor(img, x, y, w, h) {
    super(img, x, y, w, h);
  }
}
class BallTwo extends Ball {
  constructor(img, x, y, w, h) {
    super(img, x, y, w, h);
  }
}
class BallThree extends Ball {
  constructor(img, x, y, w, h) {
    super(img, x, y, w, h);
  }
}

// CREATE ARRAY FOR THE OBJECTS
const balls = [new Ball()];

// GENERATE RANDOM BALL
function randomBall() {
  // let selector = randomNum(0, 5);
  // if (selector === 0) {
  balls.push(new Ball());
  // }
  // if (selector >= 1 && selector <= 3) {
  //   balls.push(new BallTwo());
  // }
  // if (selector === 4) {
  //   balls.push(new BallThree());
  // }
}

class Hand {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw(p5) {
    p5.ellipse(this.x, this.y, this.w, this.h);
  }
}
// CRASH WITH FUNCTION
function crashWith(a, b) {
  return (
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  );
}
// GENERATE RANDOM COORDINATES
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don’t want it to be an integer
}
// THEN INITIATE THE GAME AREA
class GameArea extends Component {
  constructor(props) {
    // WE DEFINE THE GLOBAL VARIABLES HERE
    super(props);
    this.video = undefined;
    this.poseNet = undefined;
    this.pose = undefined;
    this.skeleton = undefined;
    this.bg = undefined;
    this.gameStart = false;
    this.frame = 0;
    this.handLeft = undefined;
    this.handRight = undefined;
    this.seconds = 0;
    this.timer = 60;
    this.score = 0;
    this.speed = 0;
  }
  setup = (p5, canvasParentRef) => {
    // WE DEFINE AND CALL THE CANVAS WITH P5
    let xyz = p5.createCanvas(540, 380).parent(canvasParentRef);
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    xyz.position(x, y);
    // VIDEO SETTINGS
    this.video = p5.createCapture();
    this.video.hide();
    this.poseNet = ml5.poseNet(this.video);
    this.poseNet.on("pose", (poses) => {
      // WITH CONSOLE LOG OF POSES WE CHECK ALL THE PIN POINTS OF THE BODY ARE FOUND
      if (poses.length > 0) {
        this.pose = poses[0].pose;
        this.skeleton = poses[0].skeleton;
      }
    });
    this.bg = p5.loadImage(
      "https://media.giphy.com/media/l2QEj7ksEKw8Ten6M/giphy.gif"
    );
  };
  drawCanvas = (p5) => {
    // THE DRAW REFRESHES EVERY 16MS
    // WE MIRROR THE CAM HERE
    p5.translate(this.video.width, 0);
    p5.scale(-1, 1);
    p5.image(this.video, 0, 0);
    p5.background(this.bg);

    // DETECTION DE LA POSE TOUTES LES 16 MS
    if (this.pose) {
      // WE DEFINE A VARIABLE FOR THE DISTANCE
      let eyeR = this.pose.rightEye;
      let eyeL = this.pose.leftEye;
      let d = p5.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
      // NOSE IS HERE
      p5.fill(255, 0, 0);
      p5.ellipse(this.pose.nose.x, this.pose.nose.y, d);
      // AND THE OTHER BODY POINTS
      for (let i = 0; i < this.pose.keypoints.length; i++) {
        let x = this.pose.keypoints[i].position.x;
        let y = this.pose.keypoints[i].position.y;
        p5.fill(0, 255, 0);
        p5.ellipse(x, y, 16, 16);
      }
      // THE EDGES OF THE SKELETON ARE DRAWN
      for (let i = 0; i < this.skeleton.length; i++) {
        let a = this.skeleton[i][0];
        let b = this.skeleton[i][1];
        p5.strokeWeight(2);
        p5.stroke(255);
        p5.line(a.position.x, a.position.y, b.position.x, b.position.y);
      }
      // WE INITIATE THE START OF THE GAME
      if (
        this.gameStart === false &&
        d < 23 &&
        this.pose.leftHip.confidence > 0.9 &&
        this.pose.rightHip.confidence > 0.9
      ) {
        this.gameStart = true;
      }
    }
    // WHEN THE GAME STARTS THE USER GETS THE GLOVES
    if (this.gameStart === true) {
      // END GAME CONDITIONS
      let timeGame = this.timer - this.seconds;
      // console.log(timeGame);
      if (timeGame <= 0) {
        this.gameStart = false;
        timeGame = 60;
      }
      // RECOVER TIME
      this.props.gameTime(timeGame);
      p5.fill(0, 0, 255);
      let handRight = new Hand(
        this.pose.rightWrist.x,
        this.pose.rightWrist.y,
        70,
        70
      );
      let handLeft = new Hand(
        this.pose.leftWrist.x,
        this.pose.leftWrist.y,
        70,
        70
      );
      handRight.draw(p5);
      handLeft.draw(p5);
      // GAME STARTS AFTER THREE SECONDS !!!
      if (this.seconds > 3) {
        // WE ITERATE THROUGH THE SECONDS
        // AT 3 SECONDS WE CREATE THE BALL
        // RENTRER DANS FOR EACH
        balls.forEach((ball, i) => {
          console.log("ball", ball);

          function toFinish() {
            // TO FINISH FOR LEVELS ? ?
            // let speed = 3;
            // if (ball.x === 140) {
            //   speed = 3;
            // }
            // ball.x = ball.x + speed;
            // if (ball.x >= 700) {
            //   setTimeout(function () {
            //     balls.splice(i, 1);
            //     balls.push(new Ball());
            //   }, 1000);
            //   // LOSE POINTS
            // }
            // //   if (ball.x === 140) {
            // //     speed = randomNum(3,7);
            // //   }
            // //   ball.x = ball.x + speed;
            // if (ball.y >= 400) {
            //   balls.splice(i, 1);
            //   balls.push(new Ball());
            // }
            // const randomXorY = randomNum(0,2)
            // console.log(randomXorY)
            // if(randomXorY === 1){
            //   let speed = randomNum(3,7);
            //   if (ball.x === 140) {
            //     speed = randomNum(3,7);
            //   }
            //   ball.x = ball.x + speed;
            // } else {
            //   let speed = randomNum(3,7);
            //   if (ball.y === 50) {
            //     speed = randomNum(3,7);
            //   }
            //   ball.y = ball.y + speed;
            // }
            // MATH RANDOM
            // SI ON EST < 0,5 ALTERER AXE X ET A L’INVERSE AXE DES Y
            // let speed = randomNum(3,7);
            // if (ball.x === 140) {
            //   speed = randomNum(3,7);
            // }
            // ball.x = ball.x + speed;
          }

          ball.draw(p5);
          ball.y = ball.y + this.speed;
          if (crashWith(ball, handLeft)) {
            balls.splice(i, 1);
            this.score += 100;
            randomBall();
            this.props.score(this.score);
          }
          if (crashWith(ball, handRight)) {
            balls.splice(i, 1);
            this.score += 100;
            randomBall();
            this.props.score(this.score);
          }
        });
      }
    }
    // INCREMENTATION OF THE FRAMES
    this.frame++;
    this.seconds = Math.floor(this.frame / 60);
  };
  // WE RENDER THE GAME CANVAS AND VOIIIILA
  render() {
    return (
      <div>
        <Sketch
          setup={this.setup}
          draw={this.drawCanvas}
          className="defaultCanvas0"
        />
      </div>
    );
  }
}
export default GameArea;

/////// TASK LIST ///////

//// MARDI 

// FULL SCREEN 
// MUSIQUE ==> UN SON A DEUX ET SONS VALIDATIONS, EFFETS ... 
// AJUSTEMENT DES REGLES (AJUSTEMENT SPEED, TEMPS MORTS COLLISION ET MOUVEMENTS) ET ANIMATIONS 


////  EN COURS 
// ADD IMAGES TO CIRCLES
// DEPLOYEMENT
// API SCORE
// BUGS REDIRECTIONS 


// MECREDI 
// GROS CSS 
// DEBUG ET CHECK 

// JEUDI

// SLIDES 

// VENDREDI 
// MICROPHONE













// draw(p5) {
//   this.img = p5.loadImage('/images/logo.png')
//   p5.image(this.img, this.x, this.y, this.w, this.h);
// }

// let img = p5.loadImage(‘images/venus.png’);
// p5.ellipse(this.x, this.y, this.w, this.h);

// let randomColour = randomNum(0, 4);
// console.log(randomColour);

// if (randomColour < 2) {
//
// }
// if (randomColour > 2 && randomColour < 4) {
//   p5.fill(0, 255, 0);
// }
// if (randomColour > 3) {
//   p5.fill(0, 255, 0);
// }

// if (ball.y >= 400) {
//   balls.splice(i, 1);
//   this.score -= 500;
//   balls.push(new Ball());
// }

// if (ball.y === 50) {
//   this.speed = 3 + this.score / 500;
// }
