import { createContext } from 'react';

const Contex = createContext({
  currentUser: null,
  isAuth: false,
  draft: null,
  currentPin: null
});

export default Contex;
