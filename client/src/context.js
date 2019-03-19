import { createContext } from 'react';

const Contex = createContext({
  currentUser: null,
  isAuth: false,
  draft: null,
  pins: [],
  currentPin: null,
  mapStyle: {
    height: 'calc(100vh - 124px)',
    width: '100vw'
  }
});

export default Contex;
