import React from "react";

import "./index.scss";

const SwitchBookmark = () => {
    return (
        <div className="switch-wrap">
            <div title="Bookmark only">
                <span role="img" aria-label="star">
                    ⭐
                </span>
                <label>
                    <input type="checkbox" />
                    <span></span>
                </label>
            </div>
        </div>
    );
};

export default SwitchBookmark;
