import React from "react";

import "./index.scss";

import noResult from "images/no-result.png";

const NoResult = () => (
    <div className="no-result">
        <span>Sorry&#44; no results found for this search! 😢</span>
        <img src={noResult} alt="no result" />
    </div>
);

export default NoResult;
