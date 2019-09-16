import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import buyMeACoffee from "images/buy-me-a-coffee.png";
import github from "images/github.svg";

import "./index.scss";

const Header = ({ siteTitle }) => (
    <header>
        <div>
            <Link to="/">{siteTitle}</Link>
            <div>
                <a
                    href="https://github.com/soulcactus/every-code"
                    target="_blank"
                >
                    <img src={github} alt="github" />
                </a>
                <a
                    href="https://www.buymeacoffee.com/l4PoOWUVv"
                    target="_blank"
                >
                    <img
                        src={buyMeACoffee}
                        alt="Buy Me A Coffee"
                        class="buy-coffee"
                    />
                </a>
            </div>
        </div>
    </header>
);

Header.propTypes = {
    siteTitle: PropTypes.string
};

export default Header;
