import React, { useState, useEffect, useContext } from 'react';
import MapGL, {
  Source,
  Layer,
  NavigationControl,
  GeolocateControl,
  Marker
} from '@urbica/react-map-gl';

import Context from '../context';

import PinIcon from './Auth/PinIcon';

const INITIAL_VIEWPORT = {
  latitude: 51.507351,
  longitude: -0.127758,
  zoom: 13
};

const MapUrbica = () => {
  const { state, dispatch } = useContext(Context);
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    getUserPosition();
  }, []);

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

  return (
    <MapGL
      style={{
        height: 'calc(100vh - 64px)',
        width: '100vw'
      }}
      mapStyle='mapbox://styles/mapbox/streets-v9'
      accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      latitude={viewport.latitude}
      longitude={viewport.longitude}
      zoom={viewport.zoom}
      onViewportChange={newViewport => setViewport(newViewport)}
      onClick={handleMapClick}>
      <NavigationControl showCompass showZoom position='top-right' />
      <GeolocateControl position='top-left' />

      {/* User location Pin */}
      {userPosition && (
        <Marker longitude={userPosition.longitude} latitude={userPosition.latitude}>
          <PinIcon name='map-pin' size='3x' className='red-text' />
        </Marker>
      )}

      {/* Draft Pin Location */}
      {state.draft && (
        <Marker longitude={state.draft.longitude} latitude={state.draft.latitude}>
          <PinIcon name='map-marker-alt' size='2x' className='indigo-text' />
        </Marker>
      )}
    </MapGL>
  );
};

export default MapUrbica;
