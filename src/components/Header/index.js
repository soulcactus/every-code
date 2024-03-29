import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import logo from 'images/logo.svg';
import buyMeACoffee from 'images/buy-me-a-coffee.png';
import github from 'images/github.svg';

import './index.scss';

function Header({ siteTitle }) {
    return (
        <header>
            <div>
                <Link to="/">
                    <img src={logo} alt={siteTitle} className="logo" />
                </Link>
                <div>
                    <a
                        href="https://github.com/soulcactus/every-code"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={github} alt="github" className="github" />
                    </a>
                    <a
                        href="https://www.buymeacoffee.com/soulcactus"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={buyMeACoffee}
                            alt="buy me a coffee"
                            className="buy-me-a-coffee"
                        />
                    </a>
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    siteTitle: PropTypes.string,
};

export default React.memo(Header);
