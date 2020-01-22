import React from 'react';

import './index.scss';

import noResult from 'images/no-result.png';

function NoResult() {
    return (
        <div className="no-result">
            <span>
                Sorry&#44; no results<b> found for this search</b>!
                <span role="img" aria-label="disappointed_relieved">
                    😢
                </span>
            </span>
            <img src={noResult} alt="no result" />
        </div>
    );
}

export default NoResult;
