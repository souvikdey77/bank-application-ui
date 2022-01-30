import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Signout() {
    return (
        <div className="app-signout-container">
            <h2>You are successfully logged out!!</h2>
            <Link to="/" className="btn">
                    Signin
              </Link>
        </div>
    )
}
export default connect()(Signout)
