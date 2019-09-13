import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "components/Layout";
import SEO from "components/seo";
import CodeContainer from "components/CodeContainer";
import CodeItem from "components/CodeItem";
import Search from "components/Search";
import Message from "components/Message";
import NoResult from "components/NoResult";
import GoTop from "components/GoTop";
import Category from "components/Category";

import unmarked from "images/bookmark-unmarked.svg";
import marked from "images/bookmark-marked.svg";

export const data = graphql`
    query codeQuery {
        allCode {
            edges {
                node {
                    id
                    char
                    name
                    category
                    htmlEntity
                    htmlCode
                    hexCode
                    cssCode
                }
            }
        }
    }
`;

const IndexPage = ({ data }) => {
    const storage = typeof window !== `undefined` ? window.localStorage : null;
    const edges = data.allCode.edges;
    const initialCodeList = edges.slice(0, 60);
    const [searchValue, setSearchValue] = useState("");
    const [categoryIdx, setCategoryIdx] = useState(0);
    const [codeList, setCodeList] = useState(initialCodeList);
    const [bookmarkState, setbookmarkState] = useState(false);
    const [bookmarkList, setbookmarkList] = useState([]);
    const [copyState, setCopyState] = useState(false);
    let codes = codeList;
    let searchCodes;
    let markRestCodes;

    const categoryList = [
        "Standard",
        "Emoji",
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

    const getCurrentScrollPercentage = () =>
        ((window.scrollY + window.innerHeight) / document.body.clientHeight) *
        100;

    const handleSearch = (value) => {
        setSearchValue(value);
        setCodeList(initialCodeList);

        searchCodes = edges.filter((item) =>
            searchValue.includes(item.node.char)
        );

        codes = searchCodes;
    };

    const handleCategory = (idx) => {
        setCategoryIdx(idx);

        if (idx === 0) {
            setCodeList(initialCodeList);
        }
    };

    const handleBookmark = (node) => {
        const id = node.id;
        const overlapCode = bookmarkList.filter((item) => id === item.node.id);
        const removeRestCodes = bookmarkList.filter(
            (item) => id !== item.node.id
        );

        if (overlapCode.length === 0) {
            storage.setItem(id, JSON.stringify(node));
            setbookmarkList([...bookmarkList, { node }]);
            setbookmarkState(true);

            setTimeout(() => {
                setbookmarkState(false);
            }, 500);
        } else {
            storage.removeItem(id);
            setbookmarkList(removeRestCodes);
        }
    };

    const handleCopy = (code) => {
        const body = document.body;
        const dummy = document.createElement(`textarea`);

        body.appendChild(dummy);
        dummy.value = code;
        dummy.select();
        document.execCommand(`copy`);
        body.removeChild(dummy);
        setCopyState(true);

        setTimeout(() => {
            setCopyState(false);
        }, 500);
    };

    const handleScroll = useCallback(() => {
        if (getCurrentScrollPercentage() > 90) {
            setCodeList((prevCodes) => {
                let addList = prevCodes.length + 60;

                if (prevCodes.length + 60 >= edges.length) {
                    addList = edges.length;
                }

                return [
                    ...prevCodes,
                    ...edges.slice(prevCodes.length, addList)
                ];
            });
        }
    }, [edges]);

    const handleScrollTop = () => {
        if (categoryIdx === 0) {
            setCodeList(initialCodeList);
        }
    };

    useEffect(() => {
        let bookmark = [];

        for (const [key, value] of Object.entries(storage)) {
            if (!isNaN(Number(key))) {
                const node = JSON.parse(value);

                bookmark.push({ node });
            }
        }

        setbookmarkList(bookmark);

        if (categoryIdx === 0) {
            window.addEventListener(`scroll`, handleScroll, false);
            return () => window.removeEventListener(`scroll`, handleScroll);
        }
    }, [storage, categoryIdx, handleScroll]);

    for (let i = 0; i <= categoryList.length; i++) {
        if (categoryIdx === i + 1) {
            codes = edges.filter(
                (item) => item.node.category === categoryList[i]
            );
        }
    }

    if (searchValue) {
        searchCodes = edges.filter((item) =>
            searchValue.includes(item.node.char)
        );

        codes = searchCodes;
    }

    if (bookmarkList.length !== 0) {
        const id = bookmarkList.map((item) => item.node.id);

        markRestCodes = codes.filter((item) => !id.includes(item.node.id));
        searchValue
            ? (codes = searchCodes)
            : (codes = [...bookmarkList, ...markRestCodes]);
    }

    return (
        <Layout>
            <SEO title="Home" />
            {copyState && <Message message={`Copied to Clipboard! 😊`} />}
            {bookmarkState && (
                <Message message={`Added to the bookmark! ⭐️`} />
            )}
            <Search handleSearch={handleSearch} />
            {!searchValue && (
                <Category
                    handleCategory={handleCategory}
                    categoryIdx={categoryIdx}
                />
            )}
            <CodeContainer>
                {codes.length !== 0 ? (
                    codes.map(({ node }, index) => (
                        <CodeItem
                            node={node}
                            handleCopy={handleCopy}
                            handleBookmark={handleBookmark}
                            key={index}
                        >
                            {!searchValue ? (
                                index < bookmarkList.length ? (
                                    <img src={marked} alt="marked" />
                                ) : (
                                    <img src={unmarked} alt="unmarked" />
                                )
                            ) : bookmarkList
                                  .map((item) => item.node.id)
                                  .includes(node.id) ? (
                                <img src={marked} alt="marked" />
                            ) : (
                                <img src={unmarked} alt="unmarked" />
                            )}
                        </CodeItem>
                    ))
                ) : (
                    <NoResult />
                )}
            </CodeContainer>
            <GoTop handleScrollTop={handleScrollTop} />
        </Layout>
    );
};

IndexPage.propTypes = {
    data: PropTypes.object.isRequired
};

export default IndexPage;
