import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import "./index.scss";

const Header = ({ siteTitle }) => (
    <header>
        <div>
            <Link to="/">{siteTitle}</Link>
        </div>
    </header>
);

Header.propTypes = {
    siteTitle: PropTypes.string
};

export default Header;
