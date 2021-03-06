import React, { useState, useContext } from 'react';
import axios from 'axios';
import { MDBIcon, MDBRow, MDBCol, MDBBtn, MDBContainer } from 'mdbreact';

import { useClient } from '../../client';
import Context from '../../context';
import { CREATE_PIN_MUTATION } from '../../graphql/mutations';

const CreatePin = () => {
  const client = useClient();
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

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'geopins');
    data.append('cloud_name', 'dbb4ncb3t');
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dbb4ncb3t/image/upload',
      data,
      { headers: { 'X-Requested-With': 'XMLHttpRequest' } }
    );
    return res.data.url;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const url = await handleImageUpload();
      const { latitude, longitude } = state.draft;
      const variables = {
        title,
        image: url,
        content,
        latitude,
        longitude
      };
      await client.request(CREATE_PIN_MUTATION, variables);
      handleDeleteDraft();
    } catch (error) {
      setSubmitting(false);
      console.error('Error:', error);
    }
  };

  return (
    <MDBContainer>
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
              Submit{' '}
              {submitting ? (
                <div className='spinner-border spinner-border-sm' role='status'>
                  <span className='sr-only'>Loading...</span>
                </div>
              ) : (
                <MDBIcon icon='check' />
              )}
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </form>
    </MDBContainer>
  );
};

export default CreatePin;
