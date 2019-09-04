import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

const CodeContainer = React.memo(({ children }) => (
    <div className="code-container">{children}</div>
));

CodeContainer.propTypes = {
    children: PropTypes.node.isRequired
};

export default CodeContainer;
