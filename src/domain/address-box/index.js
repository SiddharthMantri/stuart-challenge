import React, { Fragment, useContext, useState } from 'react';
import { Grid } from '@material-ui/core';
import TextInput from '../../components/TextInput';
import useDeliveryInput from '../../hooks/useDeliveryInput';
import Card from '../../components/Card';
import Button from '../../components/Button';
import PickUpBadgeBlankIcon from '../../icons/pickUpBadgeBlank.svg';
import PickUpBadgePresent from '../../icons/pickUpBadgePresent.svg';
import PickUpBadgeError from '../../icons/pickUpBadgeError.svg';
import API from '../../api';
import Context from '../../state/context';

const AddressBox = props => {
    const [pickup, changePickup, isValidPickup] = useDeliveryInput('');
    const [dropoff, changeDropoff, isValidDropOff] = useDeliveryInput('');
    const { state, toast } = useContext(Context);
    const { showToast = () => { } } = toast;
    const { drawMarker, addMarker, clearMap } = state;
    const [loading, setLoading] = useState(false);

    const handleOnClick = () => {
        setLoading(true);
        API.geocode({ address: '29 Rue du 4 Septembre' }).then(({ address = '', latitude: lat, longitude: lng }) => {
            setLoading(false);
            drawMarker({
                icon: PickUpBadgePresent,
                lat,
                lng,
            });
        });

        showToast();
    };

    return (
        <Grid container item lg={3} sm={12} xs={12} md={3} style={{ position: 'absolute', zIndex: 2000, margin: '32px' }}>
            <Card>
                <Grid container>
                    <Grid container item xs={12} lg={12}>
                        <Grid item xs={1}>
                            {pickup === '' ? <PickUpBadgeBlankIcon /> : isValidPickup ? <PickUpBadgePresent /> : <PickUpBadgeError />}
                        </Grid>
                        <Grid item xs={11}>
                            <TextInput id='pickup-address' value={pickup} onChange={changePickup} placeholder="Pick up address" style={{ marginBottom: '16px', width: '100%' }} />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} lg={12}>
                        <Grid item xs={1}>
                            <PickUpBadgeBlankIcon />
                        </Grid>
                        <Grid item xs={11}>
                            <TextInput id='dropoff-address' value={dropoff} onChange={changeDropoff} placeholder="Drop off address" style={{ marginBottom: '16px', width: '100%' }} />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} lg={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={11}>
                            <Button onClick={handleOnClick} style={{ width: '100%' }}>
                                {!loading ? 'Create Job' : 'Creating...'}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Card >
        </Grid>
    )
}
export default AddressBox;
