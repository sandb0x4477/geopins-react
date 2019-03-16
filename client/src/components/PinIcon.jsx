import React from 'react';
import { MDBIcon } from 'mdbreact';

export default ({ name, size, className, onClick }) => (
  <MDBIcon onClick={onClick} icon={name} size={size} className={className} />
);
