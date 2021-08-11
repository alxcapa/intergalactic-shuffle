import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import Sketch from "react-p5";
import * as ml5 from "ml5";

import p5 from "p5";
// let windowWidth = 840;
// let windowHeight = 580;
// let largeScreen = false;
let ballOneScore = 0;
let ballTwoScore = 0;
let ballThreeScore = 0;

// FIRST WE ESTABLISH CLASSES
class Ball {
  constructor(p5, type = "ballOne") {
    this.x = randomNum(140, 600);
    this.y = randomNum(50, 300);
    this.w = 50;
    this.h = 50;
    this.type = type;
    let imgPath;
    switch (type) {
      case "ballOne":
        imgPath = "images/lune.png";
        break;
      case "ballTwo":
        imgPath = "images/planet.png";
        break;
      case "ballThree":
        imgPath = "images/sun.png";
        break;
    }
    p5.loadImage(imgPath, (img) => {
      this.img = img;
    });
  }
  draw(p5) {
    if (!this.img) {
      return;
    }
    p5.image(this.img, this.x, this.y, this.w, this.h);
  }
}

// CREATE ARRAY FOR THE OBJECTS
const balls = [];
// GENERATE RANDOM BALL
function randomBall(p5) {
  let selector = randomNum(0, 5);
  if (selector === 0) {
    balls.push(new Ball(p5, "ballOne"));
  }
  if (selector >= 1 && selector <= 3) {
    balls.push(new Ball(p5, "ballTwo"));
  }
  if (selector === 4) {
    balls.push(new Ball(p5, "ballThree"));
  }
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
///// FUNCTIONS ////
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

// GET THE OBJECT TALLEY
function getObjectScore(ball) {
  if (ball.type === "ballOne") {
    ballOneScore += 1;
  }
  if (ball.type === "ballTwo") {
    ballTwoScore += 1;
  }
  if (ball.type === "ballThree") {
    ballThreeScore += 1;
  }
}

/////// GAME AREA //////

/// THEN INITIATE THE GAME AREA
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

  /// SETUP FUNCTION
  setup = (p5, canvasParentRef) => {
    // WE DEFINE AND CALL THE CANVAS WITH P5
    // 540, 380

    let width = 540;
    let height = 380;
    let xyz = p5.createCanvas(width, height).parent(canvasParentRef);
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    this.dim = p5.width / 2;
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


    //Background aléatoire 
    let backOne = "https://media.giphy.com/media/l2QEj7ksEKw8Ten6M/giphy.gif"
    let backTwo = "images/test1.gif"
    let backThree = "images/test2.gif"
    let backFor = "images/test3.gif"
    let backFive = "images/test4.gif"
    let backSix = "images/test5.gif"

    let arrayBack = [backOne, backTwo, backThree, backFor, backFive, backSix];



    console.log("array", arrayBack)

    /// BACKGROUND
    this.bg = p5.loadImage(
      arrayBack[randomNum(0, 5)]
    );
    // this.bg = p5.loadImage('/images/gifTests.gif');
    balls.push(new Ball(p5));
  };

  // DRAW CANVAS FUNCTION
  drawCanvas = (p5) => {
    let timeGame = 60;
    this.props.gameTime(timeGame);
    // THE DRAW REFRESHES EVERY 16MS
    // WE MIRROR THE CAM HERE
    p5.translate(this.video.width, 0);
    p5.scale(-1, 1);
    p5.image(this.video, 0, 0);
    p5.background(this.bg);
    // function windowResized() {
    //   p5.resizeCanvas(windowWidth, windowHeight);
    // }
    // function mouseClicked() {
    //   document
    //     .querySelector(".fullScreen")
    //     .addEventListener("click", function () {
    //       if (largeScreen === false) {
    //         windowResized();
    //         document.querySelector(".fullScreen").innerText =
    //           "LARGER SCREEN ON";
    //         document.getElementById("defaultCanvas0").style.left = "437px";
    //         document.getElementById("defaultCanvas0").style.top = "202.5px";
    //         largeScreen = true;
    //       } else {
    //         p5.resizeCanvas(540, 380);
    //         document.querySelector(".fullScreen").innerText =
    //           "LARGER SCREEN OFF";
    //         document.getElementById("defaultCanvas0").style.left = "626px";
    //         document.getElementById("defaultCanvas0").style.top = "279.5px";
    //         largeScreen = false;
    //       }
    //     });
    // }
    // mouseClicked();

    // DETECTION DE LA POSE TOUTES LES 16 MS
    if (this.pose) {
      // WE DEFINE A VARIABLE FOR THE DISTANCE
      let eyeR = this.pose.rightEye;
      let eyeL = this.pose.leftEye;
      let d = p5.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
      // NOSE IS HERE
      p5.fill(191, 195, 198);
      p5.ellipse(this.pose.nose.x, this.pose.nose.y, d);
      // AND THE OTHER BODY POINTS
      for (let i = 0; i < this.pose.keypoints.length; i++) {
        let x = this.pose.keypoints[i].position.x;
        let y = this.pose.keypoints[i].position.y;
        p5.fill(154, 216, 233);
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
      console.log("seconds are here", this.seconds)
      // console.log('seconds', this.seconds);
      let randomColour = randomNum(0, 4);
      // console.log(randomColour);
      if (randomColour < 2) {
        p5.fill(0, 0, 255);
      }
      if (randomColour > 2 && randomColour < 4) {
        p5.fill(0, 255, 0);
      }
      if (randomColour > 3) {
        p5.fill(0, 0, 0);
      }
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



      // if (this.seconds <5) {
      //   console.log('music here', this.seconds)
      // }
      if (this.seconds) {
        console.log("lets do it", this.seconds)
        // WE ITERATE THROUGH THE SECONDS
        // AT 3 SECONDS WE CREATE THE BALL
        // RENTRER DANS FOR EACH
        balls.forEach((ball, i) => {
          // console.log('ball', ball);
          ball.draw(p5);
          ball.y = ball.y + this.speed;
          if (crashWith(ball, handLeft)) {
            balls.splice(i, 1);
            // console.log(ball.type);
            getObjectScore(ball);
            // console.log(ballOneScore, ballTwoScore, ballThreeScore);
            collisionSound.play();
            this.score += 100;
            randomBall(p5);

            this.props.score(this.score);
          }
          if (crashWith(ball, handRight)) {
            balls.splice(i, 1);
            getObjectScore(ball);
            // console.log(ball.type);
            // console.log(ballOneScore, ballTwoScore, ballThreeScore);
            collisionSound.play();
            this.score += 100;
            randomBall(p5);
            this.props.score(this.score);
          }
        });
      }

      // TIMER !!!!!
      timeGame = 60 - this.seconds;
      this.props.gameTime(timeGame);
      // console.log('timeGame', timeGame)
      // console.log('timer', this.timer)
      // console.log("seconds", this.seconds);
      this.props.object(ballOneScore, ballTwoScore, ballThreeScore);
      //END GAME CONDITIONS
      if (timeGame === 0) {
        this.gameStart = false;
        timeGame = 60;
        // this.seconds = 0;
        console.log("game over");
        // SENDING DATA TO API
        this.props.scoreEndGame(this.gameStart)
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

let collisionSound = new Audio("images/collisionsound.wav");
export default GameArea;




/////// TASK LIST ///////


// TIME THING
// MODEL SCORE TRUC
// RETAFFER STORY 
// BUGS REDIRECTIONS




//////  EN COURS
// MUSIQUE ==> UN SON A DEUX ET SONS VALIDATIONS, EFFETS ...
// MUSIQUE

///// MECREDI






// ADD player + sound design + ASSISTANT
// Selection de son et ambiances 





//
// AJUSTEMENT DES REGLES (AJUSTEMENT SPEED, TEMPS MORTS COLLISION ET MOUVEMENTS) ET ANIMATIONS
// AJOUT ANNONCER AVEC MESSAGE ASSISTANT

//// JEUDI
// GROS CSS
// DEBUG ET CHECK

// SLIDES
// DERNIERES TOUCHES

//// VENDREDI
// MICROPHONE

function toFinish() {
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
