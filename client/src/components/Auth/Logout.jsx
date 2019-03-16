import React, { useContext } from 'react';
import { MDBDropdownItem, MDBIcon } from 'mdbreact';
import { GoogleLogout } from 'react-google-login';

import Context from '../../context';

const Logout = () => {
  const { dispatch } = useContext(Context);

  // const onSucces = async googleUser => {
  //   try {
  //     const idToken = googleUser.getAuthResponse().id_token;
  //     const client = new GraphQLClient(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
  //       headers: { authorization: idToken }
  //     });
  //     const { me } = await client.request(ME_QUERY);
  //     dispatch({ type: 'LOGIN_USER', payload: me });
  //     dispatch({ type: 'IS_LOGGED_IN', payload: googleUser.isSignedIn() });
  //   } catch (error) {
  //     onFailure(error);
  //   }
  // };

  const onSignout = () => {
    dispatch({ type: 'LOGOUT_USER' });
    console.log('Signed out user');
  };

  return (
    <GoogleLogout
      onLogoutSuccess={onSignout}
      render={({ onClick }) => (
        <MDBDropdownItem onClick={onClick}>
          <MDBIcon icon='sign-out-alt' />
          &nbsp;&nbsp;Logout
        </MDBDropdownItem>
      )}
    />

    // <div
    //   className='d-flex justify-content-center align-items-center'
    //   style={{ height: '150px' }}>
    //   <h4 className='mr-2'>Welcome to GeoPins</h4>
    //   <GoogleLogout
    //     clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
    //     render={renderProps => (
    //       <MDBBtn size='sm' color='deep-orange' onClick={renderProps.onClick}>
    //         <MDBIcon fab icon='google-plus-g' className='mr-2' />
    //         Login with Google
    //       </MDBBtn>
    //     )}
    //     buttonText='Login'
    //     onSuccess={onSucces}
    //     onFailure={onFailure}
    //     isSignedIn={true}
    //   />
    // </div>
  );
};

export default Logout;
