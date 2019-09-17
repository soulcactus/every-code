import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

const CodeItem = ({ node, handleCopy, handleBookmark, children }) => {
    const codeList = (code, codeType) => (
        <li onClick={() => handleCopy(code)}>
            {code}
            <span>{codeType}</span>
        </li>
    );

    return (
        <div className="code-item" key={node.id}>
            <div title={node.name}>
                <div
                    className="bookmark"
                    title="bookmark"
                    onClick={() => handleBookmark(node)}
                >
                    {children}
                </div>
                <span onClick={() => handleCopy(node.char)}>{node.char}</span>
            </div>
            <ul>
                {node.htmlEntity && codeList(node.htmlEntity, `HTML Entity`)}
                {codeList(node.htmlCode, `HTML Code`)}
                {codeList(node.hexCode, `HEX Code`)}
                {codeList(node.cssCode, `CSS Code`)}
            </ul>
        </div>
    );
};

CodeItem.propTypes = {
    node: PropTypes.object.isRequired,
    handleCopy: PropTypes.func.isRequired,
    handleBookmark: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default CodeItem;
