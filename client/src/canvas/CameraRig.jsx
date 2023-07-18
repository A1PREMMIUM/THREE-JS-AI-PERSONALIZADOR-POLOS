import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import state from '../store/index.js';

const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isBreaktpoint = windows.innerWidth<=1260;
    const isMobile = windows.innerWidth>=600;
    // set the initial position of the model
    let targetPosition =[-0.4, 0, 2];
    if(snap.intro){
      if(isBreaktpoint) targetPosition = [0, 0, 2];
      if(isMobile) targetPosition = [0, 0.2, 2.5];
    }else{
      if(isMobile) targetPosition = [0, 0.2, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // set model position camera
    easing.damp3(state.camera.position,targetPosition,0.25,delta)
    // set model rotation smoothly
    easing.dampE(
      group.current.rotation,
      [snap.pointer.y / 10 - snap.pointer.x / 5, 0],
      0.25,
      delta,
      
    );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
