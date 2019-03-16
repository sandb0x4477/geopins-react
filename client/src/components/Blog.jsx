import React, { useContext } from 'react';
import { MDBContainer } from 'mdbreact';

import NoContent from './Pin/NoContent';
import CreatePin from './Pin/CreatePin';
import PinContent from './Pin/PinContent';

import Context from '../context';

const Blog = () => {
  const { state } = useContext(Context);
  const { draft, currentPin } = state;

  let BlogContent;
  if (!draft && !currentPin) {
    BlogContent = NoContent;
  } else if (draft && !currentPin) {
    BlogContent = CreatePin;
  } else if (!draft && currentPin) {
    BlogContent = PinContent;
  }

  return (
    <MDBContainer style={{ minHeight: '140px', width: '100vw' }}>
      <BlogContent />
    </MDBContainer>
  );
};

export default Blog;
