import React, { useState, useEffect, useRef } from "react";
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
    const list = useRef(codeList);
    let codes = useRef(null);

    const getCurrentScrollPercentage = () =>
        ((window.scrollY + window.innerHeight) / document.body.clientHeight) *
        100;

    const handleSearch = (value) => {
        setSearchValue(value);
    };

    const handleCategory = (idx) => {
        setCategoryIdx(idx);
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

    const handleScrollTop = () => {
        setCodeList((allCode) => allCode.slice(0, 60));
    };

    list.current = codeList;

    useEffect(() => {
        const initialCodeList = edges.slice(0, 60);
        const id = bookmarkList.map((item) => item.node.id);
        const listLen = list.current.length;
        const searchLen = searchValue.length;
        const bookmarkLen = bookmarkList.length;

        const expression = () =>
            listLen <= 1 ||
            (listLen - searchLen > 1 && listLen - searchLen <= 60);

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

        let bookmarkRestCodes;

        if (searchLen !== 0) {
            const searchCodes = edges.filter((item) =>
                searchValue.includes(item.node.char)
            );

            setCodeList(searchCodes);
        } else {
            if (categoryIdx === 0) {
                const filter = edges.filter(
                    (item) => !id.includes(item.node.id)
                );

                setCodeList(initialCodeList);

                if (bookmarkLen !== 0) {
                    if (expression()) {
                        bookmarkRestCodes = filter.slice(0, 60 - bookmarkLen);
                    } else {
                        bookmarkRestCodes = filter.slice(
                            0,
                            listLen - bookmarkLen
                        );
                    }
                }

                codes.current = filter;
            }

            for (let i = 0; i <= categoryList.length; i++) {
                const filter = edges.filter(
                    (item) =>
                        item.node.category === categoryList[i] &&
                        !id.includes(item.node.id)
                );

                if (categoryIdx === i + 1) {
                    setCodeList(
                        edges
                            .filter(
                                (item) => item.node.category === categoryList[i]
                            )
                            .slice(0, 60)
                    );

                    codes.current = filter;

                    if (bookmarkLen !== 0) {
                        if (expression()) {
                            bookmarkRestCodes = filter.slice(
                                0,
                                60 - bookmarkLen
                            );
                        } else {
                            bookmarkRestCodes = filter.slice(
                                0,
                                listLen - bookmarkLen
                            );
                        }
                    }
                }
            }

            if (bookmarkLen !== 0) {
                setCodeList([...bookmarkList, ...bookmarkRestCodes]);
            }
        }
    }, [edges, bookmarkList, searchValue, categoryIdx]);

    useEffect(() => {
        setCodeList((allCode) => allCode.slice(0, 60));

        const handleScroll = () => {
            if (getCurrentScrollPercentage() > 90) {
                setCodeList((prevCodes) => {
                    let addList = prevCodes.length + 60;

                    return [
                        ...prevCodes,
                        ...codes.current.slice(prevCodes.length, addList)
                    ];
                });
            }
        };

        window.addEventListener(`scroll`, handleScroll, false);
        return () => window.removeEventListener(`scroll`, handleScroll);
    }, [categoryIdx]);

    useEffect(() => {
        let bookmark = [];

        for (const [key, value] of Object.entries(storage)) {
            if (!isNaN(Number(key))) {
                const node = JSON.parse(value);

                bookmark.push({ node });
            }
        }

        setbookmarkList(bookmark);
    }, [storage]);

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
                {codeList.length !== 0 ? (
                    codeList.map(({ node }, index) => (
                        <CodeItem
                            node={node}
                            handleCopy={handleCopy}
                            handleBookmark={handleBookmark}
                            key={node.id}
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
