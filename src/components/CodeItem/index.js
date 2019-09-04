import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

const CodeItem = ({ node, copyCode }) => {
    return (
        <div className="code-item" key={node.id}>
            <div title={node.description}>
                <span>{node.char}</span>
            </div>
            <ul>
                <li onClick={() => copyCode(node.cssCode)}>
                    {node.cssCode}
                    <span>CSS Code</span>
                </li>
                <li onClick={() => copyCode(node.hexCode)}>
                    {node.hexCode}
                    <span>HEX Code</span>
                </li>
                <li onClick={() => copyCode(node.htmlCode)}>
                    {node.htmlCode}
                    <span>HTML Code</span>
                </li>
                {node.htmlEntity && (
                    <li onClick={() => copyCode(node.htmlEntity)}>
                        {node.htmlEntity}
                        <span>HTML Entity</span>
                    </li>
                )}
            </ul>
        </div>
    );
};

CodeItem.propTypes = {
    node: PropTypes.object.isRequired
};

export default CodeItem;
