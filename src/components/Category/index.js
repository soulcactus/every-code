import React from "react";

import "./index.scss";

const Category = ({ handleCategory }) => {
    const categorySelect = (idx) => {
        const categoryList = document.querySelectorAll(".category li");

        categoryList.forEach((item) => item.classList.remove("selected"));
        categoryList[idx].classList.add("selected");
        handleCategory(idx);
    };

    return (
        <div className="category">
            <ul>
                <li className="selected" onClick={() => categorySelect(0)}>
                    ALL
                </li>
                <li onClick={() => categorySelect(1)}>Standard</li>
            </ul>
        </div>
    );
};

export default Category;
