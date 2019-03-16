import React, { useState, useContext } from 'react';
import axios from 'axios';
import { MDBIcon, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

import Context from '../../context';
import { CREATE_PIN_MUTATION } from '../../graphql/mutations';

const CreatePin = () => {
  const { state, dispatch } = useContext(Context);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleDeleteDraft = () => {
    setTitle('');
    setImage('');
    setContent('');
    dispatch({ type: 'DELETE_DRAFT' });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);
  };

  return (
    <form>
      <MDBRow className='mb-1 pt-2'>
        <MDBCol size='6'>
          <input
            type='text'
            placeholder='Title'
            className='form-control'
            id='title'
            onChange={e => setTitle(e.target.value)}
          />
        </MDBCol>
        <MDBCol size='6'>
          <div className='input-group'>
            <div className='custom-file'>
              <label className='custom-file-label' htmlFor='inputGroupFile01'>
                Image
              </label>
              <input
                accept='image/*'
                type='file'
                className='custom-file-input'
                id='inputGroupFile01'
                aria-describedby='inputGroupFileAddon01'
                onChange={e => setImage(e.target.files[0])}
              />
            </div>
          </div>
        </MDBCol>
      </MDBRow>
      <MDBRow className='mb-2'>
        <MDBCol>
          <input
            type='text'
            placeholder='Description'
            className='form-control'
            id='content'
            onChange={e => setContent(e.target.value)}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow center middle>
        <MDBCol className='text-center'>
          <MDBBtn color='secondary' size='sm' onClick={handleDeleteDraft}>
            Remove <MDBIcon icon='times' />
          </MDBBtn>
        </MDBCol>
        <MDBCol className='text-center'>
          <MDBBtn
            color='default'
            size='sm'
            type='submit'
            disabled={!title.trim() || !content.trim() || !image || submitting}
            onClick={handleSubmit}>
            Submit <MDBIcon icon='check' />
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </form>
  );
};

export default CreatePin;
