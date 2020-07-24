import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

function SwitchBookmark({ handleSwitch }) {
    return (
        <>
            <div className="notice">
                📢 NOTICE &#58; URL changes from https://everycode.store/ to{' '}
                <a href="https://everycode.shop/">https://everycode.shop/</a>
            </div>
            <div className="switch-wrap">
                <p>
                    ⚠ WARNING&#33; Removing the browser cache will also remove
                    your bookmarks&#46;
                </p>
                <div title="Only bookmarks">
                    <span role="img" aria-label="star">
                        ⭐
                    </span>
                    <label>
                        <input type="checkbox" onChange={handleSwitch} />
                        <span></span>
                    </label>
                </div>
            </div>
        </>
    );
}

SwitchBookmark.propTypes = {
    handleSwitch: PropTypes.func.isRequired,
};

export default React.memo(SwitchBookmark);
