import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio';

import state from '../store/index.js';
import { CustomButton } from '../components/index.js';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion.js';

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>

      snap.intro && (
      <motion.div className='home' {...slideAnimation('left')}>
        <motion.header {...slideAnimation('left')}>
          <img src="./threejs.png" alt="logo" className='logo' />
        </motion.header>

        <motion.div className="home-content" {...headContentAnimation}>
          <motion.div {...headTextAnimation}>
            <h1 className='head-text'>
              LET´S
              <br className='xl:block hidden' />DO IT.
            </h1>
          </motion.div>

          <motion.div
            {...headContainerAnimation}
            className='flex flex-col gap-5'
          >
            <p className='max-w-md font-normal text-gray-600 text-base'>
              Create your unique and exclusive shirt with our
              brand new 3D customization tool.<strong>
                Unleash your imagination</strong>{""}
              and define your own style.
            </p>

            <CustomButton
              // @ts-ignore
              type="filles"
              title="Customize *thrEEcks* It"
              handleClick={() => state.intro = false}
              customStyle="w-fit px-4 py-2.5 font-bold text-sm 
              "
            />

          </motion.div>
        </motion.div>
      </motion.div>
      )

    </AnimatePresence>
  );
}

export default Home;






