import React, { useContext } from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from 'mdbreact';

import Context from '../context';
import Logout from './Auth/Logout';

const Header = () => {
  const { state, dispatch } = useContext(Context);
  const { currentUser } = state;

  const handleSignOut = () => {
    window.gapi.auth2.getAuthInstance().signOut();
    dispatch({ type: 'LOGOUT_USER', payload: null });
  };

  return (
    <MDBNavbar color='primary-color' dark>
      <MDBNavbarBrand href='/'>
        <MDBIcon icon='map-pin' />
        <strong className='white-text ml-2'>GeoPins</strong>
      </MDBNavbarBrand>
      <MDBNavbarNav right>
        <MDBNavItem>
          <MDBDropdown>
            <MDBDropdownToggle className='dopdown-toggle' nav caret>
              {currentUser.name}&nbsp;&nbsp;
              <img
                src={currentUser.picture}
                className='rounded-circle z-depth-0'
                style={{ height: '30px', padding: 0 }}
                alt='user pic'
              />
            </MDBDropdownToggle>
            <MDBDropdownMenu className='dropdown-default' right>
              {/* <MDBDropdownItem href='#!'>My account</MDBDropdownItem> */}
              <MDBDropdownItem onClick={handleSignOut}>
                <MDBIcon icon='sign-out-alt' />
                &nbsp;&nbsp;Logout
              </MDBDropdownItem>
              {/* <Logout /> */}
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavItem>
      </MDBNavbarNav>
    </MDBNavbar>
  );
};

export default Header;
