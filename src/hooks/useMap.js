/* eslint-disable no-use-before-define */
import { useState, createRef, useMemo } from 'react';
import GoogleMap from '../models/GoogleMap';

/**
 * Custom hook that acts as a proxy for the GoogleMap class
 * @param {*} key Gmaps API Key
 * Returns the initial state and manages state updates when the user interacts with Maps
 */
const useMap = (key = '') => {
    const mapContainer = createRef();
    const googleMap = useMemo(() => new GoogleMap(key, mapContainer), []);
    const {
        map,
        apiKey = '',
        markers = [],
        drawMarker = () => { },
        clearMap = () => { },
        clearByType = () => { },
        markerMap = {},
        status = () => { },
    } = googleMap;

    /**
     * Helper method that gets a Function and its arguments
     * Triggers the function with passed arguments and forces state update
     */
    const update = (fn = () => { }) => (args) => {
        fn(args);
        const newState = status({ ...defaultState });
        setState({ ...defaultState, ...newState });
    };

    // Initial state of the hook, contains the required keys from the GoogleMap class
    const defaultState = {
        map,
        mapContainer,
        apiKey,
        markers,
        markerMap,
        drawMarker: update(drawMarker),
        clearMap: update(clearMap),
        clearByType: update(clearByType),
    };

    const [state, setState] = useState(defaultState);

    return { state };
};

export default useMap;
