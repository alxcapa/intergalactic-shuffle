import React, { useRef } from "react";
import Player from "./player";
import Start from "./start-btn";
import Webcam from "react-webcam";
import { async } from "regenerator-runtime";
import * as posenet from "@tensorflow-models/posenet";
// import { from } from "node-fetch/node_modules/form-data";
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
      //get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // set video width

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // make detections
      const pose = await net.estimateSinglePose(video);
      console.log(pose);

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.5, ctx);
    drawSkeleton(pose["keypoints"], 0.5, ctx);
  };






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
