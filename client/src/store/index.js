import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  LogoDecal: './three.png',
  fullDecal: './three.png',
});

export default state;