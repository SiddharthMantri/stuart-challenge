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
import styles from './address.module.css';
import AddressError from './address.error';


const PICKUP = 'pickup';
const DROPOFF = 'dropoff';

const AddressBoxPresentation = ({ pickup = '', isValidPickup = false, changePickup = () => { }, onPickupBlur = () => { }, dropoff = '', isValidDropOff = false, changeDropoff = () => { }, onDropoffBlur = () => { }, loading = false, handleOnClick = () => { }, disabled = true }) => (
    <Grid container item lg={3} sm={12} xs={12} md={6}>
        <Card>
            <Grid container>
                <Grid container item xs={12} lg={12} style={{ maxHeight: '32px', marginBottom: '16px' }}>
                    <div className={styles['input-icon']}>
                        {pickup === '' ? <PickUpBadgeBlankIcon /> : isValidPickup ? <PickUpBadgePresent /> : <PickUpBadgeError />}
                    </div>
                    <div className={styles['input-text']}>
                        <TextInput id='pickup-address' value={pickup} onChange={changePickup} placeholder="Pick up address"
                            style={{ marginBottom: '16px', width: '100%' }}
                            onBlur={onPickupBlur}
                        />
                    </div>
                </Grid>
                <Grid container item xs={12} lg={12} style={{ maxHeight: '32px', marginBottom: '16px' }}>
                    <div className={styles['input-icon']}>
                        {dropoff === '' ? <DropOffBadgeBlankIcon /> : isValidDropOff ? <DropOffBadgePresent /> : <DropOffBadgeError />}
                    </div>
                    <div className={styles['input-text']}>
                        <TextInput id='dropoff-address' value={dropoff} onChange={changeDropoff} placeholder="Drop off address"
                            style={{ marginBottom: '16px', width: '100%' }}
                        />
                    </div>
                </Grid>
                <Grid container item xs={12} lg={12}>
                    <div className={styles['input-icon']}></div>
                    <div className={styles['input-text']}>
                        <Button id='create-job-btn' onClick={handleOnClick} style={{ width: '100%' }} disabled={disabled}>
                            {!loading ? 'Create Job' : 'Creating...'}
                        </Button>
                    </div>
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
        if (!isValidPickup) {
            clearByType({ type: PICKUP });
        }
        if (!isValidDropOff) {
            clearByType({ type: DROPOFF });
        }
    }, [isValidDropOff, isValidPickup]);

    useEffect(() => {
        if (pickupAddress !== null) {
            const {
                longitude: lng,
                latitude: lat,
            } = pickupAddress;
            drawMarker({ type: PICKUP, lat, lng });
        }
    }, [pickupAddress]);
    useEffect(() => {
        if (dropOffAddress !== null) {
            const {
                longitude: lng,
                latitude: lat
            } = dropOffAddress;
            drawMarker({ type: DROPOFF, lat, lng });
        }
    }, [dropOffAddress]);

    useEffect(() => {
        if (pickup.length === 0 || dropoff.length === 0) {
            setDisabled(true);
            setLoading(false);
        }
        if (pickup.length === 0) {
            clearByType({ type: PICKUP });
        }
        if (dropoff.length === 0) {
            clearByType({ type: DROPOFF });
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
    return (
        <AddressError>
            <AddressBoxPresentation {...addressProps} />
        </AddressError>
    );
};
export default AddressBox;
