import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

import goTop from "images/go-top.svg";

function GoTop({ handleScrollTop }) {
    const scrollTop = () => {
        let scrollY = window.scrollY;
        let scrollSpeed = scrollY / 2;

        if (scrollY < 1) {
            handleScrollTop();
            return;
        }

        scrollY -= scrollSpeed;
        window.scrollTo(0, scrollY);
        setTimeout(scrollTop);
    };

    return (
        <button className="go-top" onClick={scrollTop}>
            <img src={goTop} alt="go top" />
        </button>
    );
}

GoTop.propTypes = {
    handleScrollTop: PropTypes.func.isRequired
};

export default React.memo(GoTop);
