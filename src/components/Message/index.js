import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

const Message = ({ message }) => (
    <React.Fragment>
        <div className="message">
            <span>{message}</span>
        </div>
    </React.Fragment>
);

Message.propTypes = {
    message: PropTypes.string.isRequired
};

export default Message;
