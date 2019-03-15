import React, { Component } from 'react';
import ReactMapboxGl, { ZoomControl } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  minZoom: 4,
  maxZoom: 17
});

const center = [4.899, 52.372];

const style = 'mapbox://styles/mapbox/streets-v9';

const MapTemp = () => {
  const handleClick = event => {
    console.log(event);
  };

  return (
    <Map
      // eslint-disable-next-line react/style-prop-object
      style={style}
      center={center}
      containerStyle={{
        height: 'calc(100vh - 64px)',
        width: '100vw'
      }}
      onClick={handleClick}>
      <ZoomControl />
    </Map>
  );
};

export default MapTemp;
