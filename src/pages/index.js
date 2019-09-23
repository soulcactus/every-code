import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Head from "components/Head";
import Layout from "components/Layout";
import Message from "components/Message";
import SwitchBookmark from "components/SwitchBookmark";
import Search from "components/Search";
import NoResult from "components/NoResult";
import Category from "components/Category";
import CodeContainer from "components/CodeContainer";
import CodeItem from "components/CodeItem";
import GoTop from "components/GoTop";

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
    const localStorage =
        typeof window !== `undefined` ? window.localStorage : null;
    const edges = data.allCode.edges;
    const initialCodeList = edges.slice(0, 60);
    const [switchState, setSwitchState] = useState(false);
    const [searchValue, setSearchValue] = useState(``);
    const [categoryIndex, setcategoryIndex] = useState(0);
    const [codeList, setCodeList] = useState(initialCodeList);
    const [bookmarkState, setbookmarkState] = useState(false);
    const [bookmarkList, setbookmarkList] = useState([]);
    const [copyState, setCopyState] = useState(false);
    const list = useRef(codeList);
    let codes = useRef(null);

    const getCurrentScrollPercentage = () =>
        ((window.scrollY + window.innerHeight) / document.body.clientHeight) *
        100;

    const handleSwitch = (e) => {
        e.target.checked ? setSwitchState(true) : setSwitchState(false);
    };

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const handleCategory = (index) => {
        setcategoryIndex(index);
    };

    const handleBookmark = (e, node) => {
        const nodeId = node.id;
        const overlapCode = bookmarkList.filter(
            (item) => nodeId === item.node.id
        );

        const removeRestCodes = bookmarkList.filter(
            (item) => nodeId !== item.node.id
        );

        e.stopPropagation();

        if (overlapCode.length === 0) {
            localStorage.setItem(nodeId, JSON.stringify(node));
            setbookmarkList([...bookmarkList, { node }]);
            setbookmarkState(true);

            setTimeout(() => {
                setbookmarkState(false);
            }, 500);
        } else {
            localStorage.removeItem(nodeId);
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
        const bookmarkIdList = bookmarkList.map((item) => item.node.id);
        const listLength = list.current.length;
        const searchLength = searchValue.length;
        const bookmarkLength = bookmarkList.length;

        const expression = () =>
            listLength <= 1 ||
            (listLength - searchLength > 1 && listLength - searchLength <= 60);

        const categoryList = [
            `Standard`,
            `Emoji`,
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

        let bookmarkRestCodes;

        if (searchLength !== 0) {
            const searchCodes = edges.filter((item) =>
                searchValue.includes(item.node.char)
            );

            setCodeList(searchCodes);
        } else {
            if (categoryIndex === 0) {
                const filter = edges.filter(
                    (item) => !bookmarkIdList.includes(item.node.id)
                );

                setCodeList(initialCodeList);

                if (bookmarkLength !== 0) {
                    if (expression()) {
                        bookmarkRestCodes = filter.slice(
                            0,
                            60 - bookmarkLength
                        );
                    } else {
                        bookmarkRestCodes = filter.slice(
                            0,
                            listLength - bookmarkLength
                        );
                    }
                }

                codes.current = filter;
            }

            for (let i = 0; i <= categoryList.length; i++) {
                const filter = edges.filter(
                    (item) =>
                        item.node.category === categoryList[i] &&
                        !bookmarkIdList.includes(item.node.id)
                );

                if (categoryIndex === i + 1) {
                    setCodeList(
                        edges
                            .filter(
                                (item) => item.node.category === categoryList[i]
                            )
                            .slice(0, 60)
                    );

                    codes.current = filter;

                    if (bookmarkLength !== 0) {
                        if (expression()) {
                            bookmarkRestCodes = filter.slice(
                                0,
                                60 - bookmarkLength
                            );
                        } else {
                            bookmarkRestCodes = filter.slice(
                                0,
                                listLength - bookmarkLength
                            );
                        }
                    }
                }
            }

            if (bookmarkLength !== 0) {
                if (switchState) {
                    setCodeList(bookmarkList);
                } else {
                    setCodeList([...bookmarkList, ...bookmarkRestCodes]);
                }
            }
        }
    }, [edges, switchState, bookmarkList, searchValue, categoryIndex]);

    useEffect(() => {
        const searchLength = searchValue.length;

        setCodeList((allCode) => allCode.slice(0, 60));

        const handleScroll = () => {
            if (getCurrentScrollPercentage() > 90) {
                setCodeList((previousCodes) => {
                    let addList = previousCodes.length + 60;

                    return [
                        ...previousCodes,
                        ...codes.current.slice(previousCodes.length, addList)
                    ];
                });
            }
        };

        if (searchLength === 0 && !switchState) {
            window.addEventListener(`scroll`, handleScroll, false);
            return () => window.removeEventListener(`scroll`, handleScroll);
        }
    }, [searchValue, categoryIndex, switchState]);

    useEffect(() => {
        let bookmark = [];

        for (const [key, value] of Object.entries(localStorage)) {
            if (!isNaN(Number(key))) {
                const node = JSON.parse(value);

                bookmark.push({ node });
            }
        }

        setbookmarkList(bookmark);
    }, [localStorage]);

    return (
        <Layout>
            <Head title="main" />
            {copyState && <Message message={`Copied to Clipboard! 😊`} />}
            {bookmarkState && (
                <Message message={`Added to the bookmark! ⭐️`} />
            )}
            <SwitchBookmark handleSwitch={handleSwitch} />
            <Search handleSearch={handleSearch} />
            {!searchValue && (
                <Category
                    handleCategory={handleCategory}
                    categoryIndex={categoryIndex}
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
