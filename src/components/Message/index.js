import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

function Message({ message }) {
    return (
        <div
            className="message"
            role="alertdialog"
            aria-labelledby="dialogTitle"
        >
            <span id="dialogTitle">{message}</span>
        </div>
    );
}

Message.propTypes = {
    message: PropTypes.string.isRequired,
};

export default Message;
