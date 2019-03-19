import React, { useState, useEffect, useContext } from 'react';
import { MDBIcon, MDBBtn } from 'mdbreact';
import MapGL, { GeolocateControl, Marker, Popup } from '@urbica/react-map-gl';
import differenceInMinutes from 'date-fns/difference_in_minutes';

import { useClient } from '../client';
import { GET_PINS_QUERY } from '../graphql/queries';
import { DELETE_PIN_MUTATION } from '../graphql/mutations';
import Context from '../context';
import PinIcon from './PinIcon';

const INITIAL_VIEWPORT = {
  latitude: 51.507351,
  longitude: -0.127758,
  zoom: 13
};

const MapUrbica = () => {
  const client = useClient();
  const { state, dispatch } = useContext(Context);
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    getPins();
  }, []);

  useEffect(() => {
    getUserPosition();
  }, []);

  const getPins = async () => {
    const { getPins } = await client.request(GET_PINS_QUERY);
    dispatch({ type: 'GET_PINS', payload: getPins });
  };

  const getUserPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;
        setViewport({ ...viewport, latitude, longitude });
        setUserPosition({ latitude, longitude });
      });
    }
  };

  const handleMapClick = ({ lngLat }) => {
    setPopup(null);
    if (!state.draft) {
      dispatch({ type: 'CREATE_DRAFT' });
    }
    const { lng, lat } = lngLat;
    dispatch({
      type: 'UPDATE_DRAFT_LOCATION',
      payload: { longitude: lng, latitude: lat }
    });
  };

  const handleSelectPin = pin => {
    setPopup(pin);
    dispatch({ type: 'SET_PIN', payload: pin });
  };

  const handlePopupClose = () => {
    setPopup(null);
    dispatch({ type: 'DELETE_DRAFT' });
  };

  const highlightNewPin = pin => {
    const isNewPin = differenceInMinutes(Date.now(), Number(pin.createdAt)) <= 30;
    return isNewPin ? 'red-text' : 'blue-text';
  };

  const handleDeletePin = async pin => {
    const variables = { pinId: pin.id };
    const { deletePin } = await client.request(DELETE_PIN_MUTATION, variables);
    dispatch({ type: 'DELETE_PIN', payload: deletePin });
    setPopup(null);
  };

  const isOwner = () => state.currentUser.id === popup.user.id;

  return (
    <MapGL
      style={state.mapStyle}
      mapStyle='mapbox://styles/mapbox/streets-v9'
      accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      latitude={viewport.latitude}
      longitude={viewport.longitude}
      zoom={viewport.zoom}
      onViewportChange={newViewport => setViewport(newViewport)}
      onClick={handleMapClick}>
      {/* <NavigationControl showCompass showZoom position='top-right' /> */}
      <GeolocateControl position='top-left' />

      {/* User location Pin */}
      {userPosition && (
        <Marker
          longitude={userPosition.longitude}
          latitude={userPosition.latitude}
          offset={[0, -18]}>
          <PinIcon name='map-pin' size='3x' className='blue-text' />
        </Marker>
      )}

      {/* Draft Pin Location */}
      {state.draft && (
        <Marker
          longitude={state.draft.longitude}
          latitude={state.draft.latitude}
          offset={[0, -18]}>
          <PinIcon name='map-marker-alt' size='3x' className='indigo-text' />
        </Marker>
      )}

      {/* Created Pins */}
      {state.pins.map(pin => (
        <Marker
          key={pin.id}
          longitude={pin.longitude}
          latitude={pin.latitude}
          offset={[0, -18]}>
          <PinIcon
            name='map-marker-alt'
            size='2x'
            className={highlightNewPin(pin)}
            onClick={() => handleSelectPin(pin)}
          />
        </Marker>
      ))}

      {/* Popup */}
      {popup && (
        <Popup
          longitude={popup.longitude}
          latitude={popup.latitude}
          closeButton={true}
          closeOnClick={false}
          offset={[0, -22]}
          onClose={handlePopupClose}>
          <img className='popup-image' src={popup.image} alt={popup.title} />
          <h5 className='h5-responsive mb-0 pt-1'>{popup.title}</h5>

          {isOwner() && (
            <div className='text-center mt-1'>
              <MDBBtn size='sm' color='red' onClick={() => handleDeletePin(popup)}>
                <MDBIcon icon='trash-alt' />
              </MDBBtn>
            </div>
          )}
        </Popup>
      )}
    </MapGL>
  );
};

export default MapUrbica;
