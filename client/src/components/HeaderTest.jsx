import React, { Component } from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdbreact';

class HeaderTest extends Component {
  state = {
    collapseID: ''
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  render() {
    return (
      <MDBNavbar color='primary-color' dark expand='sm' style={{ marginBottom: '40px' }}>
        <MDBNavbarBrand>
          <strong className='white-text'>GeoPins</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse('navbarCollapse3')} />
        <MDBCollapse id='navbarCollapse3' isOpen={this.state.collapseID} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to='#!'>Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to='#!'>Features</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to='#!'>Pricing</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className='d-none d-md-inline'>MDBDropdown</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className='dropdown-default' right>
                  <MDBDropdownItem href='#!'>Action</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle className='dopdown-toggle' nav>
                  <img
                    src='https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg'
                    className='rounded-circle z-depth-0'
                    style={{ height: '35px', padding: 0 }}
                    alt=''
                  />
                </MDBDropdownToggle>
                <MDBDropdownMenu className='dropdown-default' right>
                  <MDBDropdownItem href='#!'>My account</MDBDropdownItem>
                  <MDBDropdownItem href='#!'>Log out</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default HeaderTest;
