import { createContext } from 'react';

const Contex = createContext({
  currentUser: null,
  isAuth: false,
  draft: null
});

export default Contex;
