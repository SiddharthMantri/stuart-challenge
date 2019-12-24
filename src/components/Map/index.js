import React, { useContext } from 'react';
import Context from '../../state/context';

const Map = (props) => {
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
        <div className={styles.mapContainer} ref={mapContainer} id="delivery-map" />
    );
}