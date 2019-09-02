import React from "react";

export const CodeItem = ({ node }) => (
    <div>
        <p>{node.id}</p>
        <p>{node.character}</p>
        <p>{node.cssCode}</p>
        <p>{node.htmlCode}</p>
        <p>{node.hexCode}</p>
        <p>{node.htmlEntity}</p>
        <p>{node.description}</p>
    </div>
);
