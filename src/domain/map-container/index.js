/* eslint-disable object-curly-newline */
import React, { Fragment, useEffect, useCallback, createRef } from 'react';
import styles from './style.css';

const MapContainer = ({ apiKey = '', options = {}, children }) => {
    const mapContainer = createRef();
    const drawMap = useCallback(() => {
        new window.google.maps.Map(mapContainer.current, { zoom: 14, center: { lat: 48.85, lng: 2.35 }, disableDefaultUI: true, draggable: false });
    }, []);
    const loadScript = () => {
        if (window.google) {
            return;
        }
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://maps.google.com/maps/api/js?key=${apiKey}`;
        const tags = document.getElementsByTagName('script')[0];
        tags.parentNode.insertBefore(script, tags);

        script.addEventListener('load', () => {
            drawMap();
        });
    };

    useEffect(() => {
        loadScript();
    }, []);
    return (
        <Fragment>
            <div className={styles.mapContainer} ref={mapContainer} id="delivery-map" />
        </Fragment>
    );
};

export default MapContainer;
