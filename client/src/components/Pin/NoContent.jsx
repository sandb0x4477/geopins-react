import React from 'react';
import { MDBIcon, MDBContainer } from 'mdbreact';

const NoContent = () => {
  return (
    // <MDBContainer style={{ maxHeight: '60px' }}>
    <MDBContainer className='d-flex align-content-center justify-content-center flex-wrap'>
      <div className='mr-3 pt-3'>Click on the map to add a pin</div>
      <span>
        <MDBIcon far icon='compass' size='2x' style={{ paddingTop: '12px' }} />
      </span>
    </MDBContainer>
    // </MDBContainer>
  );
};

export default NoContent;
