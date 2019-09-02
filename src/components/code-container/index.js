import React from "react";

export const CodeContainer = React.memo(({ children }) => (
    <div className="code-container">{children}</div>
));
