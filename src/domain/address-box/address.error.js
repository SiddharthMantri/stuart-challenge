import React, { Component } from 'react';

class AddressError extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorMessage: '' };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Error in Address Box.</h1>
                    <p>
                        {this.state.errorMessage}
                    </p>
                </div>
            );
        }
        return this.props.children;
    }
};

export default AddressError;
