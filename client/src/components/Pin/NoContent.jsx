import React from 'react';
import { MDBIcon } from 'mdbreact';

const NoContent = () => {
  return (
    <div
      className='d-flex align-content-center justify-content-center flex-wrap'
      style={{ height: '120px' }}>
      <div className='mr-3 pt-1'>Click on the map to add a pin</div>
      <MDBIcon far icon='compass' size='2x' />
    </div>
  );
};

export default NoContent;
