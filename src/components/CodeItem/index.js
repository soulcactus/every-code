import React, { useState } from "react";
import PropTypes from "prop-types";

import "./index.scss";

const CodeItem = ({ node, handleCopy, handleMark, children }) => {
    const codeList = (code, codeType) => {
        return (
            <li onClick={() => handleCopy(code)}>
                {code}
                <span>{codeType}</span>
            </li>
        );
    };

    const bookmark = () => {
        handleMark(node);
    };

    return (
        <div className="code-item" key={node.id}>
            <div title={node.description}>
                <div
                    className="bookmark"
                    title="bookmark"
                    onClick={() => bookmark()}
                >
                    {children}
                </div>
                <span>{node.char}</span>
            </div>
            <ul>
                {codeList(node.cssCode, `CSS Code`)}
                {codeList(node.hexCode, `HEX Code`)}
                {codeList(node.htmlCode, `HTML Code`)}
                {node.htmlEntity && codeList(node.htmlEntity, `HTML Entity`)}
            </ul>
        </div>
    );
};

CodeItem.propTypes = {
    node: PropTypes.object.isRequired,
    handleCopy: PropTypes.func.isRequired,
    handleMark: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default CodeItem;
