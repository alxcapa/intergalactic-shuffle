import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import Sketch from "react-p5";
import * as ml5 from "ml5";

class Ball {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  draw(p5) {
    p5.ellipse(this.x, this.y, 50, 50);
  }
}

class GameArea extends Component {
  constructor(props) {
    super(props);
    this.video = undefined;
    this.poseNet = undefined;
    this.pose = undefined;
    this.skeleton = undefined;
    this.bg = undefined;
    this.gameStart = false;
    this.frame = 0;
    this.ball = undefined
    this.balls = [];
  }

  setup = (p5, canvasParentRef) => {
    //SKETCH APPEL SETUP ??
    // DEFINING CANVAS
    let xyz = p5.createCanvas(540, 380).parent(canvasParentRef);
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    xyz.position(x, y);

    // SETTINGS
    this.video = p5.createCapture();
    this.video.hide();
    this.poseNet = ml5.poseNet(this.video);
    this.poseNet.on("pose", (poses) => {
      // CHECKING ITS ALL GOOD
      console.log(poses);
      if (poses.length > 0) {
        this.pose = poses[0].pose;
        this.skeleton = poses[0].skeleton;
      }
    });

    //BACKGROUND
    this.bg = p5.loadImage(
      "https://media.giphy.com/media/l2QEj7ksEKw8Ten6M/giphy.gif"
    );
  };

  drawCanvas = (p5, canvasParentRef) => {
    //
    // toute les 16ms !!!!
    //

    // Miror CAM
    p5.translate(this.video.width, 0);
    p5.scale(-1, 1);
    p5.image(this.video, 0, 0);

    //BACKGROUND
    p5.background(this.bg);
    // console.log(gameStart)

    if (this.pose) {
      // ESTABLISHING THE DISTANCE
      let eyeR = this.pose.rightEye;
      let eyeL = this.pose.leftEye;
      let d = p5.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
      // console.log('this is distance===>',d)
      // console.log(pose)

      // NEZ
      p5.fill(255, 0, 0);
      p5.ellipse(this.pose.nose.x, this.pose.nose.y, d);

      // 2 BRAS
      p5.fill(0, 0, 255);
      p5.ellipse(this.pose.rightWrist.x, this.pose.rightWrist.y, 32);
      p5.ellipse(this.pose.leftWrist.x, this.pose.leftWrist.y, 32);

      // corps
      for (let i = 0; i < this.pose.keypoints.length; i++) {
        let x = this.pose.keypoints[i].position.x;
        let y = this.pose.keypoints[i].position.y;
        p5.fill(0, 255, 0);
        p5.ellipse(x, y, 16, 16);
      }

      // edges du corps
      for (let i = 0; i < this.skeleton.length; i++) {
        let a = this.skeleton[i][0];
        let b = this.skeleton[i][1];
        p5.strokeWeight(2);
        p5.stroke(255);
        p5.line(a.position.x, a.position.y, b.position.x, b.position.y);
      }

      // STARTGAME
      if (
        this.gameStart === false &&
        d < 23 &&
        this.pose.leftHip.confidence > 0.9 &&
        this.pose.rightHip.confidence > 0.9
      ) {
        this.gameStart = true;
        console.log("start===>>>", this.gameStart);
      }
    }

    // DRAW OBJECT

    if (this.gameStart === true) {
      if (this.frame > 300) {
        console.log("it works");
        // TRACER L'OBJET
        let ball = new Ball(140, 50)
        ball.draw(p5)

        // INSERER DANS LE TABLEAU
        // A QUELLE FREQUENCE

        // DETECTER COLLISION
        // ENLEVER OBJET DU TABLEAU


        // POINTS ET TEMPS !!!!












        // const ballsGame = [new Ball()];

        // ballsGame.forEach(function (ball, i) {
        //   ball.draw();
        //   ballsGame.push(new Ball)
        // })


        // const balls = [
        //   new Ball(120, 40),


        // ]

        // balls.forEach(function (ball) {
        //   ball.draw();
        // })

        // let ball = new Ball(120, 40)
        // ball.draw()







        // POINTS ET TEMPS !!!!

        // let xBall = 120;
        // let yBall = 40;
        // let speed = 3;

        // if (xBall >= 620) {
        //   speed = -5;
        // }
        // if (xBall === 120) {
        //   speed = 5;
        // }
        // xBall = xBall + speed;

        // if (
        //   (xBall === Math.round(pose.rightWrist.x) &&
        //     xBall === Math.round(pose.rightWrist.x)) ||
        //   (xBall === Math.round(pose.leftWrist.x) &&
        //     yBall === Math.round(pose.leftWrist.y))
        // ) {
        //   // hit = true;
        //   console.log("its collided");
        // }
      }
    }
    this.frame++;
    console.log(this.frame);
  };


  //PRE GAME SCREEN IS SAME

  // console.log("x ball",xBall)
  // console.log("x left wrist",Math.round(pose.leftWrist.x))
  // console.log("x right wrist",pose.rightWrist.x)

  // p5.ellipse(200, 50, 50)
  // };

  render() {
    //DRAW CANVAS

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
