//IMPORTS
import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import Sketch from "react-p5";
import * as ml5 from "ml5";
import p5 from "p5";

// GLOBAL VARIABLES
let ballOneScore;
let ballTwoScore;
let ballThreeScore;
let timeGame;

// BUILD PLANETS
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

// BUILD HANDS
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

////////////////////////////////////// FUNCTIONS

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

// CRASH WITH FUNCTION
function crashWith(a, b) {
  return (
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  );
}

// GENERATE RANDOM COORDINATES
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}

// GET THE AMOUNT OF OBJECTS
function getObjects(ball) {
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

// function getScore(ball, score) {
//   if (ball.type === "ballOne") {
//     score += 300;
//     console.log("score",score)
//   }
//   if (ball.type === "ballTwo") {
//     score += 100;
//     console.log("score",score)
//   }
//   if (ball.type === "ballThree") {
//     score += 300;
//     console.log("score",score)
//   }
// }

////////////////////////////////////// GAME AREA //////

/// THEN INITIATE THE GAME AREA

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
    this.second = 0;
    this.seconds = 0;
    this.score = 0;
    this.speed = 0;
  }

  /// SETUP
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
    // let backOne = "https://media.giphy.com/media/l2QEj7ksEKw8Ten6M/giphy.gif";
    // let backTwo = "images/test1.gif";
    // let backThree = "images/test2.gif";
    // let backFor = "images/test3.gif";
    // let backFive = "images/test4.gif";
    // let backSix = "images/test5.gif";
    // let arrayBack = [backOne, backTwo, backThree, backFor, backFive, backSix];

    // /// BACKGROUND
    // this.bg = p5.loadImage(arrayBack[randomNum(0, 5)]);

    this.bg = p5.loadImage("https://media.giphy.com/media/l2QEj7ksEKw8Ten6M/giphy.gif");

    // PUSH BALL INTO ARRAY
    balls.push(new Ball(p5));
  };

  // DRAW CANVAS
  drawCanvas = (p5) => {
    /// GOOOOD
    // THE DRAW REFRESHES EVERY 16MS
    // WE MIRROR THE CAM HERE
    p5.translate(this.video.width, 0);
    p5.scale(-1, 1);
    p5.image(this.video, 0, 0);
    p5.background(this.bg);

    // DETECTION DE LA POSE ET GAME START TOUTES LES 16 MS
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
    /// GOOOOD

    // RESET GAME !!!
    if (this.gameStart === false) {
      console.log("im false");
      this.score = 0;
      ballOneScore = 0;
      ballTwoScore = 0;
      ballThreeScore = 0;
      timeGame = 20;
      this.second = 0;
      this.props.gameTime(timeGame);
      this.props.score(this.score);
      this.props.object(ballOneScore, ballTwoScore, ballThreeScore);
    }

    // WHEN THE GAME STARTS THE USER GETS THE GLOVES
    if (this.gameStart === true) {

      // FLASHY HANDS
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
      // DRAW HANDS
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

      // GOOOOOOD

      // GAME START

      // FOREACH
      balls.forEach((ball, i) => {
  
        // console.log('ball', ball);
        ball.draw(p5);

        if (crashWith(ball, handLeft)) {
          collisionSound.play();
          balls.splice(i, 1);
          getObjects(ball);
          if (ball.type === "ballOne") {
            this.score += 300;
          }
          if (ball.type === "ballTwo") {
            this.score += 100;
          }
          if (ball.type === "ballThree") {
            this.score += 300;
          }
          randomBall(p5);
          this.props.score(this.score);
        }
        if (crashWith(ball, handRight)) {
          collisionSound.play();
          balls.splice(i, 1);
          getObjects(ball);
          if (ball.type === "ballOne") {
            this.score += 300;
          }
          if (ball.type === "ballTwo") {
            this.score += 100;
          }
          if (ball.type === "ballThree") {
            this.score += 300;
          }
          randomBall(p5);
          this.props.score(this.score);
        }

        if (timeGame <= 10) {
          // console.log("oi");
          // console.log(ball.y)
          let speed = this.score / 1500;
          ball.y = ball.y + speed;

          if (ball.y >= 400) {
            balls.splice(i, 1);
            if (ball.type === "ballOne") {
              this.score -= 300;
            }
            if (ball.type === "ballTwo") {
              this.score -= 100;
            }
            if (ball.type === "ballThree") {
              this.score -= 300;
            }
            randomBall(p5);
            this.props.score(this.score);
          }
        }

        
      });

      // FOREACH

      // TIMER DURING GAME TIME
      timeGame = 20 - this.seconds;

      // SEND OBJETS AS PROPS
      this.props.gameTime(timeGame);
      this.props.object(ballOneScore, ballTwoScore, ballThreeScore);

      //END GAME CONDITIONS
      if (timeGame === 0) {
        this.props.scoreEndGame(this.gameStart);
        this.gameStart = false;
        console.log("game over");
      }
      // this.seconds =  Math.floor(this.seconds +1/ 60);
      this.second++;
      this.seconds = Math.floor(this.second / 60);

      // console.log("seconds", this.seconds)
    }

    // INCREMENTATION OF THE FRAMES
    this.frame++;
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

/// TODAY
// GROS CSS//
// BASE DE DONNE
// BUG REDIRECTION - ROUTES

// SLIDES


// AJOUT ANNONCER AVEC MESSAGE ASSISTANT


// ALEX
// MUSIQUE ==> UN SON A DEUX ET SONS VALIDATIONS, EFFETS ...
// MUSIQUE
// ADD player + sound design + ASSISTANT
// Selection de son etgit ambiances


// ADAM
// MICROPHONE







/// STORY



// TEXT BOX GAME

// How to play: 
// Get on screen and start to dance
// Show the Alien your moves and fast
// Hit the planets and make it groove ! 

// ABOUT 

/*
<h2>...WELCOME TO INTERGALACTIC SHUFFLE HUMAN...</h2>
Join Robo-san on space station shuffle and make enough moves to keep the
crew and passengers entertained.{" "}
</div>
<br />
<div>
Grab as many objects as possible in the time limit and avoid the traps.
</div>
<br />
<div>
Intergalactic Shuffle was developped by <br /> Alexandre Capaldi & Adam
Ghaoul
</div>
<br />
<div>
<img src="images/alex-linkedin.jpeg"></img><img src="images/lnkdin.png"></img>

</div>
<br />
<div>ありがとうございます</div>
</div>

*/




function toFinish() {
  //       ball.y = ball.y + this.speed;
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
