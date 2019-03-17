import React, { useState, useEffect, useContext } from 'react';
import MapGL, { GeolocateControl, Marker } from '@urbica/react-map-gl';

import { useClient } from '../client';
import { GET_PINS_QUERY } from '../graphql/queries';
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
    console.log(lngLat);
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

  return (
    <MapGL
      style={{
        height: 'calc(100vh - 204px)',
        width: '100vw'
      }}
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
            className='red-text'
            onClick={() => handleSelectPin(pin)}
          />
        </Marker>
      ))}
    </MapGL>
  );
};

export default MapUrbica;
