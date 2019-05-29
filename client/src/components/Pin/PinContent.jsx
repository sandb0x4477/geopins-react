import React, { useContext } from 'react';
import format from 'date-fns/format';
import { MDBContainer } from 'mdbreact';

import Context from '../../context';
import Comments from '../Comment/Comments';
import CreateComment from '../Comment/CreateComment';

const PinContent = () => {
  const { state } = useContext(Context);
  const { title, content, createdAt, user, comments } = state.currentPin;

  return (
    <MDBContainer className='text-center mt-2'>
      <h5 className='blue-text'>
        <strong>{title}</strong>
      </h5>
      <h6>by {user.name}</h6>
      <h6>{format(Number(createdAt), 'Do MMM, YYYY')}</h6>
      <p>{content}</p>
      <CreateComment />
      <Comments comments={comments} />
    </MDBContainer>
  );
};

export default PinContent;
