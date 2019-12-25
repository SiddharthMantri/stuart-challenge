/* eslint-disable no-use-before-define */
import { useState, createRef, useMemo } from 'react';
import GoogleMap from '../models/GoogleMap';

const useMap = (key = '') => {
    const mapContainer = createRef();
    const googleMap = useMemo(() => new GoogleMap(key, mapContainer), []);
    const {
        map, apiKey = '', markers = [], addMarker = () => { }, clearMarker = () => { }, drawMarker = () => { }, clearMap = () => { },
        clearByType = () => { },
        markerMap = {},
    } = googleMap;

    const update = (fn = () => { }) => (args) => {
        fn(args);
        const newState = { ...defaultState };
        setState({ ...newState });
    };

    const defaultState = {
        map,
        mapContainer,
        apiKey,
        markers,
        markerMap,
        drawMarker: update(drawMarker),
        addMarker: update(addMarker),
        clearMarker: update(clearMarker),
        clearMap: update(clearMap),
        clearByType: update(clearByType),
    };

    const [state, setState] = useState(defaultState);

    return { state };
};

export default useMap;
