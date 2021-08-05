import React, { Suspense } from 'react';
import Robot from "../assistant/AssistantCharacter"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Html, useProgress } from "@react-three/drei"

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

function Character() {

  return <Canvas camera={{ far: 300 }} style={{ height: 460, width: 200 }} className="character-assistant">
    <OrbitControls />
    <Suspense fallback={<Loader />}>
      <Robot scale={2} />
    </Suspense>

  </Canvas>

}

export default Character