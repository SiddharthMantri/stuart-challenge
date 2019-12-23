import GoogleMap from "../models/GoogleMap";
import { useState } from "react";

const useMap = (key = "", id = "") => {
    const googleMap = new GoogleMap(key, id);
    const { apiKey = "", markers = [], addMarker = () => { }, clearMarker = () => { } } = googleMap;

    const update = (fn = () => { }) => args => {
        fn(args);

    }

    const [state, setState] = useState(googleMap);

    const defaultState = {

    }

    return { state };
}
export default useMap;