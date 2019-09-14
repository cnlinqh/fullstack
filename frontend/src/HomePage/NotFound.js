import React, { Component } from 'react';
import { connect } from 'react-redux';
class NotFound extends Component {
    render() {
        return (
            <dvi>
                <h2>Page Not Found: 404</h2>
            </dvi>
        )
    }
}

const connectedNotFound = connect()(NotFound)
export { connectedNotFound as NotFound };
