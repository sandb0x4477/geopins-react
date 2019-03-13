import React from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { GoogleLogin } from 'react-google-login';
import { GraphQLClient } from 'graphql-request';

const ME_QUERY = `{
	me {
    id
    name
    email
    picture
  }
}`;

const Login = () => {
  const onSucces = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;
    console.log('idToken:', idToken);
    const client = new GraphQLClient(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
      headers: { authorization: idToken }
    });
    const data = await client.request(ME_QUERY);
    console.log('data:', data);
  };

  const onFailure = response => {
    console.log('response:', response);
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
            Sign In with Google
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
