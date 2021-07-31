import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import Sketch from "react-p5";
import * as ml5 from "ml5";

function GameArea() {
  let video;
  let poseNet;
  let pose;
  let skeleton;
  let bg;

  let setup = (p5, canvasParentRef) => {
    let xyz = p5.createCanvas(540, 380).parent(canvasParentRef);
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    xyz.position(x, y);
    video = p5.createCapture();
    video.hide();
    poseNet = ml5.poseNet(video);
    poseNet.on("pose", gotPoses);
    bg = p5.loadImage("images/future-of-work.jpeg");
  };

  let gotPoses = (poses) => {
    console.log(poses);
    if (poses.length > 0) {
      pose = poses[0].pose;
      skeleton = poses[0].skeleton;
    }
  };

  let drawCanvas = (p5, canvasParentRef) => {
    p5.image(video, 0, 0);
    p5.background(bg);


    if (pose) {
      let eyeR = pose.rightEye;
      let eyeL = pose.leftEye;
      let d = p5.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

      p5.fill(255, 0, 0);
      p5.ellipse(pose.nose.x, pose.nose.y, d);
      p5.fill(0, 0, 255);
      p5.ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
      p5.ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        p5.fill(0, 255, 0);
        p5.ellipse(x, y, 16, 16);
      }

      for (let i = 0; i < skeleton.length; i++) {
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        p5.strokeWeight(2);
        p5.stroke(255);
        p5.line(a.position.x, a.position.y, b.position.x, b.position.y);
      }
    }
  };



  return (
    <div>
      <Sketch setup={setup} draw={drawCanvas} className="defaultCanvas0" />
    </div>
  );
}

export default GameArea;
