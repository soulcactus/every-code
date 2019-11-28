import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

function Search({ handleSearch }) {
    return (
        <>
            <input
                type="search"
                id="search"
                className="search"
                placeholder="👉 Search what you want"
                onChange={handleSearch}
            />
        </>
    );
}

Search.propTypes = {
    handleSearch: PropTypes.func.isRequired
};

export default React.memo(Search);
