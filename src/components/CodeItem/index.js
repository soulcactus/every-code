import React from "react";

import "./index.scss";

export const CodeItem = ({ node }) => (
    <div className="code-item" key={node.id}>
        <div title={node.description}>
            <span>{node.char}</span>
        </div>
        <ul>
            <li>
                {node.cssCode}
                <span>CSS Code</span>
            </li>
            <li>
                {node.hexCode}
                <span>HEX Code</span>
            </li>
            <li>
                {node.htmlCode}
                <span>HTML Code</span>
            </li>
            {node.htmlEntity && (
                <li>
                    {node.htmlEntity}
                    <span>HTML Entity</span>
                </li>
            )}
        </ul>
    </div>
);
