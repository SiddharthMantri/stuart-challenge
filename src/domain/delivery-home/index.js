import React, { Fragment } from 'react';
import { Container, Grid } from '@material-ui/core';
import AddressBox from '../address-box';
import MapContainer from '../map-container';
import Toast from '../Toast';
import MapOverlay from '../map-overlay';

const DeliveryHome = () => (
    <Grid container>
        <MapContainer />
        <MapOverlay>
            <AddressBox />
            <Toast />
        </MapOverlay>
    </Grid>
);

export default DeliveryHome;
