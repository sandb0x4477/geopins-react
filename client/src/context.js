import { createContext } from 'react';

const Contex = createContext({
  currentUser: null,
  isAuth: false,
  draft: null,
  pins: [],
  currentPin: null
});

export default Contex;
