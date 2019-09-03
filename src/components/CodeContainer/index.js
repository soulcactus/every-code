import React from "react";

import "./index.scss";

export const CodeContainer = React.memo(({ children }) => (
    <div className="code-container">{children}</div>
));
