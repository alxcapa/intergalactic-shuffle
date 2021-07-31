import React, { useRef } from "react";
import Player from "./player";
import Start from "./start-btn";
import Webcam from "react-webcam";
// import { async } from "regenerator-runtime";
import * as posenet from "@tensorflow-models/posenet";
import { drawKeypoints, drawSkeleton } from "./utilities";



function GameArea() {



  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 320, height: 240 },
      scale: 0.5,
    });
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      //VIDEO PROPERTIES ICI
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //WIDTH ET HEIGHT DE LA CAM
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //LOG DES MOUVEMENTS ET PARTIES DU CORPS
      const pose = await net.estimateSinglePose(video);

      console.log("full position ===>", pose);
      console.log("score====>", pose.score);

      console.log("nose====>", pose.keypoints[0]);
      console.log("wrist====>", pose.keypoints[9].score);
      if (pose.keypoints[9].score > 0.6) {
        console.log("i see ur wrist");
      }
      if (pose.keypoints[11].score > 0.6) {
        console.log("i see ur left hip");
      }
      if (pose.keypoints[12].score > 0.6) {
        console.log("i see ur right hip");
      }
      if (pose.keypoints[13].score > 0.6) {
        console.log("i see ur left knee");
      }

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

 
  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    //OBJECTS DEMO
    // ctx.fillRect(25, 25, 50, 50);
    // ctx.fillRect(100, 100, 50, 50);


    drawKeypoints(pose["keypoints"], 0.5, ctx);
    drawSkeleton(pose["keypoints"], 0.5, ctx);

  }

  runPosenet();

  return (
    <div className="game-area">
      <Webcam ref={webcamRef} className="game-area-webcam" />
      <canvas ref={canvasRef} className="game-area-canvas" />

      <Player />
      <Start />
    </div>
  );
}

export default GameArea;
