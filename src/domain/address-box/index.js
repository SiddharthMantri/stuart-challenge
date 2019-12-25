/* eslint-disable no-nested-ternary */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import TextInput from '../../components/TextInput';
import useDeliveryInput from '../../hooks/useDeliveryInput';
import Card from '../../components/Card';
import Button from '../../components/Button';
import PickUpBadgeBlankIcon from '../../icons/pickUpBadgeBlank.svg';
import PickUpBadgePresent from '../../icons/pickUpBadgePresent.svg';
import PickUpBadgeError from '../../icons/pickUpBadgeError.svg';
import DropOffBadgeBlankIcon from '../../icons/dropOffBadgeBlank.svg';
import DropOffBadgePresent from '../../icons/dropOffBadgePresent.svg';
import DropOffBadgeError from '../../icons/dropOffBadgeError.svg';
import Context from '../../state/context';
import API from '../../api';


const AddressBoxPresentation = ({ pickup = '', isValidPickup = false, changePickup = () => { }, onPickupBlur = () => { }, dropoff = '', isValidDropOff = false, changeDropoff = () => { }, onDropoffBlur = () => { }, loading = false, handleOnClick = () => { }, disabled = true }) => (
    <Grid container item lg={3} sm={12} xs={12} md={6}>
        <Card>
            <Grid container>
                <Grid container item xs={12} lg={12}>
                    <Grid item xs={1}>
                        {pickup === '' ? <PickUpBadgeBlankIcon /> : isValidPickup ? <PickUpBadgePresent /> : <PickUpBadgeError />}
                    </Grid>
                    <Grid item xs={11} style={{ paddingLeft: '8px' }}>
                        <TextInput id='pickup-address' value={pickup} onChange={changePickup} placeholder="Pick up address"
                            style={{ marginBottom: '16px', width: '100%' }}
                            onBlur={onPickupBlur}
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={12} lg={12}>
                    <Grid item xs={1}>
                        {dropoff === '' ? <DropOffBadgeBlankIcon /> : isValidDropOff ? <DropOffBadgePresent /> : <DropOffBadgeError />}
                    </Grid>
                    <Grid item xs={11} style={{ paddingLeft: '8px' }}>
                        <TextInput id='dropoff-address' value={dropoff} onChange={changeDropoff} placeholder="Drop off address" style={{ marginBottom: '16px', width: '100%' }} />
                    </Grid>
                </Grid>
                <Grid container item xs={12} lg={12}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={11} style={{ paddingLeft: '8px' }}>
                        <Button onClick={handleOnClick} style={{ width: '100%' }} disabled={disabled}>
                            {!loading ? 'Create Job' : 'Creating...'}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Card >
    </Grid>
);
AddressBoxPresentation.propTypes = {
    pickup: PropTypes.string,
    isValidPickup: PropTypes.bool,
    changePickup: PropTypes.func,
    onPickupBlur: PropTypes.func,
    dropoff: PropTypes.string,
    isValidDropOff: PropTypes.bool,
    changeDropoff: PropTypes.func,
    onDropoffBlur: PropTypes.func,
    loading: PropTypes.bool,
    handleOnClick: PropTypes.func,
    disabled: PropTypes.bool,
};

const AddressBox = () => {
    const [pickup, changePickup, isValidPickup, pickupAddress, onPickupBlur, resetPickup] = useDeliveryInput('');
    const [dropoff, changeDropoff, isValidDropOff, dropOffAddress, onDropoffBlur, resetDropOff] = useDeliveryInput('');
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const { state, toast } = useContext(Context);
    const { showToast } = toast;
    const { drawMarker, clearMap, clearByType } = state;

    const handleOnClick = () => {
        setDisabled(true);
        setLoading(true);
        API.createJob({
            pickup,
            dropoff
        }).then((response) => {
            if (!response.error) {
                showToast();
                setLoading(false);
                clearMap();
                resetPickup();
                resetDropOff();
            }
        });
    };

    useEffect(() => {
        if (isValidDropOff && isValidPickup) {
            setDisabled(false);
        }
        if (!isValidPickup || !isValidDropOff) {
            setDisabled(true);
            setLoading(false);
        }
    }, [isValidDropOff, isValidPickup]);

    useEffect(() => {
        if (pickupAddress !== null) {
            const {
                longitude: lng,
                latitude: lat,
            } = pickupAddress;
            drawMarker({ type: 'pickup', icon: PickUpBadgePresent, lat, lng });
        }
    }, [pickupAddress]);
    useEffect(() => {
        if (dropOffAddress !== null) {
            const {
                longitude: lng,
                latitude: lat
            } = dropOffAddress;
            drawMarker({ type: 'dropoff', icon: PickUpBadgePresent, lat, lng });
        }
    }, [dropOffAddress]);

    useEffect(() => {
        if (pickup.length === 0 || dropoff.length === 0) {
            setDisabled(true);
            setLoading(false);
        }
        if (pickup.length === 0) {
            clearByType({ type: 'pickup' });
        }
        if (dropoff.length === 0) {
            clearByType({ type: 'dropoff' });
        }
        if (pickup.length === 0 && dropoff.length === 0) {
            clearMap();
        }
    }, [pickup, dropoff]);



    const addressProps = {
        pickup,
        isValidPickup,
        changePickup,
        onPickupBlur,
        dropoff,
        isValidDropOff,
        changeDropoff,
        onDropoffBlur,
        loading,
        handleOnClick,
        disabled,
    };
    return <AddressBoxPresentation {...addressProps} />;
};
export default AddressBox;
