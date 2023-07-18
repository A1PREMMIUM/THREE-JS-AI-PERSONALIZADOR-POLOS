import React from 'react'
import {Canvas} from '@react-three/fiber'
import {Enviroment,Center} from '@react-three/drei'

import Shirt from '../canvas/Shirt.jsx'
import  Backdrop  from '../canvas/Backdrop.jsx'
import CameraRig from '../canvas/CameraRig.jsx'

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 50 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Enviroment preset='city' />
      

      <CameraRig>
        <Backdrop />

          <Center>
            <Shirt />
          </Center>

      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel
        
        

