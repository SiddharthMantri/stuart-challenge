import React, { Fragment } from 'react';
import { Container, Grid } from '@material-ui/core';
import AddressBox from '../address-box';
import MapContainer from '../map-container';

const DeliveryHome = () => (
    <Grid container>
        <MapContainer apiKey="AIzaSyDmvHzsfND8c39HNI95OiahLJ7bRyXBKkA" />
        <AddressBox />
    </Grid>
);

export default DeliveryHome;
