/* eslint-disable object-curly-newline */
import React, { useContext } from 'react';
import styles from './style.css';
import Context from '../../state/context';

const MapContainer = ({ apiKey = '', options = {}, children }) => {
    const { state } = useContext(Context);
    const { mapContainer, markers = [] } = state;
    return (
        <div className={styles.mapContainer} ref={mapContainer} id="delivery-map" />
    );
};

export default MapContainer;
