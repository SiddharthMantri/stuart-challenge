import React, { Component } from 'react';

class MapError extends Component {
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
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100vh',
                    boxSizing: 'border-box',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    fontFamily: 'Roboto'
                }}>
                    <h1>Error in loading Google Map.</h1>
                    <p>
                        {this.state.errorMessage}
                    </p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default MapError;
