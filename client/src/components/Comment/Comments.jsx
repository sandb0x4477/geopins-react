import React from 'react';
import { MDBListGroup, MDBListGroupItem } from 'mdbreact';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

const Comments = ({ comments }) => {
  return (
    <MDBListGroup>
      {comments.map((comment, i) => (
        <MDBListGroupItem key={i}>
          <div className='d-flex justify-content-between align-items-center'>
            <img
              src={comment.user.picture}
              alt={comment.user.name}
              className='mr-3 rounded-circle d-inline'
              style={{ maxWidth: '35px' }}
            />
            {comment.user.name}
            <small className='text-muted'>
              {distanceInWordsToNow(Number(comment.createdAt))} ago
            </small>
          </div>
          <p className='text-left mt-1 mb-0'>{comment.text}</p>
        </MDBListGroupItem>
      ))}
    </MDBListGroup>
  );
};

export default Comments;
