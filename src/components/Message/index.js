import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

function Message({ message }) {
    return (
        <>
            <div className="message">
                <span>{message}</span>
            </div>
        </>
    );
}

Message.propTypes = {
    message: PropTypes.string.isRequired
};

export default Message;
