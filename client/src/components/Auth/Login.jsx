import React, { useContext } from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { GoogleLogin } from 'react-google-login';
import { GraphQLClient } from 'graphql-request';

import Context from '../../context';
import { ME_QUERY } from '../../graphql/queries';
import { BASE_URL } from '../../client';

const Login = () => {
  const { dispatch } = useContext(Context);

  const onSucces = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      console.log('idToken:', idToken);
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: idToken }
      });
      const { me } = await client.request(ME_QUERY);
      dispatch({ type: 'LOGIN_USER', payload: me });
      dispatch({ type: 'IS_LOGGED_IN', payload: googleUser.isSignedIn() });
    } catch (error) {
      onFailure(error);
    }
  };

  const onFailure = error => {
    console.error('Error: ', error);
  };

  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ height: '150px' }}>
      <h4 className='mr-2'>Welcome to GeoPins</h4>
      <GoogleLogin
        clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
        render={renderProps => (
          <MDBBtn size='sm' color='deep-orange' onClick={renderProps.onClick}>
            <MDBIcon fab icon='google-plus-g' className='mr-2' />
            Login with Google
          </MDBBtn>
        )}
        buttonText='Login'
        onSuccess={onSucces}
        onFailure={onFailure}
        isSignedIn={true}
      />
    </div>
  );
};

export default Login;
