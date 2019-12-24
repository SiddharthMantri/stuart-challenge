import React from 'react';
import DeliveryHome from './domain/delivery-home';
import Provider from './state/provider';

const App = () => (
    <Provider>
        <DeliveryHome />
    </Provider>
);

export default App;
