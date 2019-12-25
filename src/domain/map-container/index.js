/* eslint-disable object-curly-newline */
import React, { useContext } from 'react';
import styles from './style.css';
import Context from '../../state/context';
import MapError from './map.error';

const MapContainer = () => {
    const { state } = useContext(Context);
    const { mapContainer } = state;
    return (
        <MapError>
            <div className={styles.mapContainer} ref={mapContainer} id="delivery-map" />
        </MapError>
    );
};

export default MapContainer;
