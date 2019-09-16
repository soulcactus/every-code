import React from "react";

import "./index.scss";

const Category = ({ handleCategory, categoryIdx }) => {
    const categoryList = [
        "ALL",
        "Standard",
        "Emoji 😎",
        "Latin",
        "Modifier Letters",
        "Diacritical Marks",
        "Greek and Coptic",
        "Cyrillic",
        "General Punctuation",
        "Currency Symbols",
        "Letterlike Symbols",
        "Arrows",
        "Mathematical Operators",
        "Box Drawings",
        "Block Elements",
        "Geometric Shapes",
        "Miscellaneous Symbols",
        "Dingbats"
    ];

    return (
        <div className="category">
            <ul>
                {categoryList.map((item, idx) =>
                    categoryIdx === idx ? (
                        <li
                            className="selected"
                            onClick={() => handleCategory(idx)}
                            key={idx}
                        >
                            <span>{item}</span>
                        </li>
                    ) : (
                        <li onClick={() => handleCategory(idx)} key={idx}>
                            <span>{item}</span>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};

export default Category;
