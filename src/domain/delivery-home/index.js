import React, { Fragment } from 'react';
import AddressBox from '../address-box';
import MapContainer from '../map-container';

const DeliveryHome = () => (
    <Fragment>
        <MapContainer apiKey="AIzaSyDmvHzsfND8c39HNI95OiahLJ7bRyXBKkA" />
        <AddressBox />
    </Fragment>
);

export default DeliveryHome;
