import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import Sketch from "react-p5";
import * as ml5 from "ml5";

class Ball {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 5;
  }

  draw(p5) {
    p5.ellipse(this.x, this.y, this.w, this.h);

    if (this.x >= p5.width) {
      console.log("it works p5 width")
      this.speed = -5;
    }
    if (this.x === 120) {
      console.log("120")
      this.speed = 5;
    }
    this.x = this.x + this.speed;
    // console.log("ca bouge"
  }

}

// mouvement(ball) {
//   if (ball.x >= 620) {
//     this.speed = -5;
//   }
//   if (ball.x === 120) {
//     this.speed = 5;
//   }
//   ball.x = ball.x + this.speed;
//   // console.log("ca bouge"
// }


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
    this.ball = undefined;
    this.balls = [];
    this.handLeft = undefined;
    this.handRight = undefined;
    this.seconds = 0;
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
      // console.log(poses);
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
        // console.log("start===>>>", this.gameStart);
      }
    }






    if (this.gameStart === true) {


      // function mouvement(ball) {
      //   let speed = 5

      //   if (ball.x <= 620) {
      //     speed = -5;

      //   }
      //   if (ball.x === 145) {
      //     speed = 5;
      //   }
      //   ball.x = ball.x + speed;
      //   // console.log("ca bouge"
      // }


      p5.fill(0, 0, 255);
      let handRight = new Hand(
        this.pose.rightWrist.x,
        this.pose.rightWrist.y,
        80,
        80
      );
      let handLeft = new Hand(
        this.pose.leftWrist.x,
        this.pose.leftWrist.y,
        80,
        80
      );
      handRight.draw(p5);
      handLeft.draw(p5);

      console.log("seconds =>>>>", this.seconds);

      // JEUX QUI DEMARRE

      // INSERTION D'OBJET A 5 SECONDES APRES ?

      // DRAW OBJECT

      // AJOUT D'OBJET ELEMENT EN TABLEAU

      if (this.seconds >= 0) {
        let ball = new Ball(140, 50, 50, 50);

        ball.draw(p5)

        // mouvement(ball)
        console.log(ball.x)


        // ENLEVER OBJET DU TABLEAU

        // POINTS ET TEMPS !!!!

        //  let xBall = 120;
        // let yBall = 40;
        // let speed = 3;

        // if (xBall >= 620) {
        //   speed = -5;
        // }
        // if (xBall === 120) {
        //   speed = 5;
        // }
        // xBall = xBall + speed;
        // console.log("it works");
        // TRACER L'OBJET

        // console.log("lefthand x===>",handLeft.x)
        // console.log("lefthand===>", handLeft)

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

        // INSERER DANS LE TABLEAU
        // this.balls.push(ball)

        // console.log(this.balls)

        // A QUELLE FREQUENCE

        // DETECTER COLLISION

        function crashWith(a, b) {
          return (
            a.x < b.x + b.w &&
            a.x + a.w > b.x &&
            a.y < b.y + b.h &&
            a.y + a.h > b.y
          );
        }

        if (crashWith(ball, handLeft)) {
          console.log("victoire ?!!");
        }

        if (crashWith(ball, handRight)) {
          console.log("victoire ?!!");
        }
      }



    }

    this.frame++;
    this.seconds = Math.floor(this.frame / 60);
  };

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
