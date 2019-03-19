import React, { useState, useContext } from 'react';
import { MDBIcon, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

import Context from '../../context';
import { useClient } from '../../client';
import { CREATE_COMMENT_MUTATION } from '../../graphql/mutations';

const CreateComment = () => {
  const client = useClient();
  const { state } = useContext(Context);
  const [comment, setComment] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(comment);
    const variables = {
      text: comment,
      pinId: state.currentPin.id
    };
    await client.request(CREATE_COMMENT_MUTATION, variables);
    setComment('');
  };

  return (
    <form>
      {/* <MDBContainer> */}
      <MDBRow center>
        <div className='input-group'>
          <MDBCol size='9' style={{ padding: '0', marginLeft: '8px' }}>
            <input
              type='text'
              placeholder='Say samething...'
              className='form-control'
              id='comment'
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </MDBCol>
          <MDBCol style={{ padding: '0' }}>
            <MDBBtn
              outline
              rounded
              size='sm'
              color='primary'
              className='ml-auto'
              type='submit'
              disabled={!comment.trim()}
              onClick={handleSubmit}>
              <MDBIcon far icon='paper-plane' />
            </MDBBtn>
          </MDBCol>
        </div>
      </MDBRow>
      {/* </MDBContainer> */}
    </form>
  );
};

export default CreateComment;
