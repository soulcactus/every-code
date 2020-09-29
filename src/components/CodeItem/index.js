import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

function CodeItem({ node, handleCopy, handleBookmark, children }) {
    const codeList = (code, codeType, codeTitle) => (
        <li onClick={() => handleCopy(code)}>
            <a href="#none" title={codeTitle}>
                {code}
            </a>
            <a href="#none" title={codeTitle}>
                {codeType}
            </a>
        </li>
    );

    return (
        <div className="code-item" key={node.id}>
            <div onClick={() => handleCopy(node.char)}>
                <div
                    className="bookmark"
                    onClick={(e) => handleBookmark(e, node)}
                >
                    <button type="button">{children}</button>
                </div>
                <a href="#none" title={node.name}>
                    {node.char}
                </a>
            </div>
            <ul>
                {node.htmlEntity &&
                    codeList(
                        node.htmlEntity,
                        'HTML Entity',
                        `converting ${node.char} to HTML Entity is ${node.htmlEntity}. copy to clipboard!`,
                    )}
                {codeList(
                    node.htmlCode,
                    'HTML Code',
                    `converting ${node.char} to HTML Code is ${node.htmlCode}. copy to clipboard!`,
                )}
                {codeList(
                    node.hexCode,
                    'HEX Code',
                    `converting ${node.char} to HEX Code is ${node.hexCode}. copy to clipboard!`,
                )}
                {codeList(
                    node.cssCode,
                    'CSS Code',
                    `converting ${node.char} to CSS Code is ${node.cssCode}. copy to clipboard!`,
                )}
            </ul>
        </div>
    );
}

CodeItem.propTypes = {
    node: PropTypes.object.isRequired,
    handleCopy: PropTypes.func.isRequired,
    handleBookmark: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default React.memo(CodeItem);
