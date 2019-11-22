import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

function CodeContainer({ children }) {
    return <div className="code-container">{children}</div>;
}

CodeContainer.propTypes = {
    children: PropTypes.node.isRequired
};

export default React.memo(CodeContainer);
