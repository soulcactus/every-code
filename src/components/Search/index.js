import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

const Search = ({ handleSearch }) => {
    return (
        <>
            <input
                type="search"
                id="search"
                className="search"
                placeholder="👉 Search what you want"
                onChange={(e) => handleSearch(e.target.value)}
            />
        </>
    );
};

Search.propTypes = {
    handleSearch: PropTypes.func.isRequired
};

export default Search;
