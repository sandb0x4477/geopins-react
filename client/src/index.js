import React, { useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import Context from './context';
import reducer from './reducer';

import './index.css';
import ProtectedRoute from './ProtectedRoute';
import Splash from './Splash';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootEl = document.getElementById('root');

const Root = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  return (
    <Router>
      <Context.Provider value={{ state, dispatch }}>
        <Switch>
          <ProtectedRoute exact path='/' component={App} />
          <Route path='/login' component={Splash} />
        </Switch>
      </Context.Provider>
    </Router>
  );
};

let render = () => {
  ReactDOM.render(<Root />, rootEl);
};

render();

// if (module.hot) {
//   module.hot.accept(Root, () => {
//     const NextApp = require(Root).default;
//     render(NextApp);
//   });
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
