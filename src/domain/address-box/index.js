import React, { Fragment } from 'react';
import TextInput from '../../components/TextInput';
import useDeliveryInput from '../../hooks/useDeliveryInput';
import Card from '../../components/Card';
import Button from '../../components/Button';
import API from '../../api';

const AddressBox = props => {
    let [pickup, changePickup, isValidPickup] = useDeliveryInput('');
    let [dropoff, changeDropoff, isValidDropOff] = useDeliveryInput('');



    const handleOnClick = () => {

    };




    return (
        <Card style={{ width: '350px', position: 'absolute', zIndex: 2000 }}>
            <div className="address-input">
                <TextInput value={pickup} onChange={changePickup} placeholder="Pick up address" style={{ marginBottom: '16px', width: '100%' }} />
            </div>
            <div className="address-input">
                <TextInput value={dropoff} onChange={changeDropoff} placeholder="Drop off address" style={{ marginBottom: '16px', width: '100%' }} />
            </div>
            <div className="address-button">
                <Button onClick={handleOnClick} style={{ width: '100%' }}>
                    Create Job
                </Button>
            </div>
        </Card>
    )
}
export default AddressBox;