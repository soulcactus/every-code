import React from "react";
import PropTypes from "prop-types";

import "./index.scss";

function Category({ handleCategory, categoryIndex }) {
    const categoryList = [
        `ALL`,
        `Standard`,
        `Emoji 😎`,
        `Latin`,
        `Modifier Letters`,
        `Diacritical Marks`,
        `Greek and Coptic`,
        `Cyrillic`,
        `General Punctuation`,
        `Currency Symbols`,
        `Letterlike Symbols`,
        `Arrows`,
        `Mathematical Operators`,
        `Box Drawings`,
        `Block Elements`,
        `Geometric Shapes`,
        `Miscellaneous Symbols`,
        `Dingbats`
    ];

    return (
        <div className="category">
            <ul>
                {categoryList.map((item, index) =>
                    categoryIndex === index ? (
                        <li
                            className="selected"
                            onClick={() => handleCategory(index)}
                            key={index}
                        >
                            <span>{item}</span>
                        </li>
                    ) : (
                        <li onClick={() => handleCategory(index)} key={index}>
                            <span>{item}</span>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}

Category.propTypes = {
    handleCategory: PropTypes.func.isRequired,
    categoryIndex: PropTypes.number.isRequired
};

export default React.memo(Category);
