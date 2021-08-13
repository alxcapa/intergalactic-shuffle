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

// ENTRY POINT FOR SOUND HERE ====>>>><

function getTunes(score, type) {
  if (score % 1000 === 0) {
    // console.log("modulo plus ou moins de 1000");
    explo1Sound.play();
    seeMoves.play();
  }

  if (score % 1000 === 100) {
    // console.log("modulo plus ou moins de 1000");
    explo1Sound.play();
    wow.play();
  }
  if (score % 1000 === 300) {
    // console.log("modulo plus ou moins de 1000");
    explo1Sound.play();
    callThat.play();
  }
  if (score >= 500 && score <= 999) {
    explo2Sound.play();
    // console.log("500");
    callThat.play();
  }
  if (score >= 1000 && score <= 1500) {
    // console.log("1000");
    hitSound.play();
  }
  if (score >= 2000 && score <= 2500) {
    wow.play();
    // console.log("2000");
    power2Sound.play();
  }
  if (score >= 3000 && score <= 3500) {
    // console.log("3000");
    go.play();
    collisionSound.play();
  }
  if (type === "ballOne") {
    // console.log(" hit ballOneeee");
    laser1Sound.play();
  }
  if (type === "ballTwo") {
    // console.log(" hit ballTwooooo");
    power1Sound.play();
  }
  if (type === "ballThree") {
    laser2Sound.play();
    // console.log(" hit ballThreee");
  }
}

/// VOCAL OU SON DE FIN ???
function getFinalScore(score) {
  if (score <= 1000) {
    // console.log("The world is doomed");
    // world.play();
  }
  if (score <= 1001 && score >= 1999) {
    // console.log("You call that dancing ?");
    // callThat.play();
  }
  if (score <= 2000 && score >= 2999) {
    // console.log("Not bad");
  }
  if (score <= 3000 && score >= 3999) {
    // console.log("Good job");
    wow.play();
  }
  if (score >= 4001) {
    // console.log("Wow great moves");
    greatMoves.play();
  }
}

////////////////////////////////////// GAME AREA //////

/// THEN INITIATE THE GAME AREA

/// THEN INITIATE THE GAME AREA
class GameArea extends Component {
  constructor(props) {
    // WE DEFINE THE GLOBAL VARIABLES HERE
    super(props);
    this.video = undefined;
    this.mic = undefined;
    this.poseNet = undefined;
    this.pose = undefined;
    this.skeleton = undefined;
    this.bg = undefined;
    this.gameStart = false;
    this.frame = 0;
    this.handLeft = undefined;
    this.handRight = undefined;
    this.second = 0;
    this.othersecond = 0;
    this.otherseconds = 0;
    this.seconds = 0;
    this.score = 0;
    this.speed = 0;
    // this.audio = new Audio("images/son.mp3");
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
    // p5.getAudioContext().suspend();

    // CUT MICROPHONE
    // this.mic = p5.AudioIn();
    // this.mic.stop();
    // console.log('mic',this.mic)

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

    this.bg = p5.loadImage(
      "https://media.giphy.com/media/l2QEj7ksEKw8Ten6M/giphy.gif"
    );

    // PUSH BALL INTO ARRAY
    balls.push(new Ball(p5));
  };

  // DRAW CANVAS
  drawCanvas = (p5) => {
    // demoTune.play();
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
      // console.log("im false");
      this.score = 0;
      ballOneScore = 0;
      ballTwoScore = 0;
      ballThreeScore = 0;
      timeGame = 60;
      this.second = 0;
      this.othersecond = 0;
      this.props.gameTime(timeGame);
      this.props.score(this.score);
      this.props.object(ballOneScore, ballTwoScore, ballThreeScore);
    }

    // WHEN THE GAME STARTS THE USER GETS THE GLOVES
    if (this.gameStart === true) {
      if (this.otherseconds === 1) {
        ready.play();
      }
      if (this.otherseconds === 2) {
        go.play();
      }

     
      if (this.otherseconds >= 2) {
        
        demoTune.play();

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
            hitSound.play();

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
            getTunes(this.score, ball.type);
          }
          if (crashWith(ball, handRight)) {
            hitSound.play();

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
            getTunes(this.score);
          }

          if (timeGame <= 30) {
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
        timeGame = 60 - this.seconds;

        // SEND OBJETS AS PROPS
        this.props.gameTime(timeGame);
        this.props.object(ballOneScore, ballTwoScore, ballThreeScore);

        //END GAME CONDITIONS
        if (timeGame === 0) {
          getFinalScore(this.score);

          this.props.scoreEndGame(this.gameStart);
          this.gameStart = false;
          console.log("game over");
        }
        // this.seconds =  Math.floor(this.seconds +1/ 60);
        this.second++;
        this.seconds = Math.floor(this.second / 30);
        console.log("secs", this.seconds);
      }

      // collisionSound.play()
      // this.audio = new Audio("images/son.mp3");
      // audio.play()

      this.othersecond++;
      this.otherseconds = Math.floor(this.othersecond / 30);

      console.log("other",this.otherseconds);
     
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
let demoTune = new Audio("images/demoTune.wav");
let collisionSound = new Audio("images/collisionsound.wav");
let explo1Sound = new Audio("images/explo.wav");
let explo2Sound = new Audio("images/explo1.wav");
let hitSound = new Audio("images/hit.wav");
let laser1Sound = new Audio("images/laser1.wav");
let laser2Sound = new Audio("images/laser3.wav");
let power1Sound = new Audio("images/power1.wav");
let power2Sound = new Audio("images/power2.wav");
let seeMoves = new Audio("images/SeeMoves.wav");
let callThat = new Audio("images/CallThat.wav");
let go = new Audio("images/Go.wav");
let ready = new Audio("images/Ready.wav");
let greatMoves = new Audio("images/GreatMoves.wav");
let world = new Audio("images/World.wav");
let wow = new Audio("images/Wow.wav");

export default GameArea;

/////// TASK LIST ///////

// SLIDES//

// ALEX
// MUSIQUE ==> UN SON A DEUX ET SONS VALIDATIONS, EFFETS ...
// MUSIQUE
// ADD player + sound design + ASSISTANT
// Selection de son etgit ambiances
