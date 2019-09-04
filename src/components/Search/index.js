import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

const Search = ({ searchChange }) => {
    return (
        <React.Fragment>
            <input
                type="search"
                id="search"
                className="search"
                placeholder="👉 Search what you want"
                onChange={(e) => searchChange(e.target.value)}
            />
        </React.Fragment>
    );
};

Search.propTypes = {
    searchChange: PropTypes.func.isRequired
};

export default Search;
