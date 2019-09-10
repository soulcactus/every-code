import React, { useState, useEffect } from "react";
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

import { standardData } from "hooks/category";

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
    const storage = window.localStorage;
    const edges = data.allCode.edges;
    const initialCodeList = edges.slice(0, 60);
    const [searchValue, setSearchValue] = useState("");
    const [copyState, setCopyState] = useState(false);
    const [markState, setMarkState] = useState(false);
    const [markList, setMarkList] = useState([]);
    const [codeList, setCodeList] = useState(initialCodeList);
    const [categoryIdx, setCategoryIdx] = useState(0);
    let bookmark = [];
    let codes = codeList;
    let searchCodes;
    let markRestCodes;

    const getCurrentScrollPercentage = () =>
        ((window.scrollY + window.innerHeight) / document.body.clientHeight) *
        100;

    const handleSearch = (value) => {
        setSearchValue(value);
        setCodeList(initialCodeList);
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

    const handleMark = (node) => {
        const id = node.id;
        const overlapCode = markList.filter((item) => id === item.node.id);
        const removeRestCodes = markList.filter((item) => id !== item.node.id);

        if (overlapCode.length === 0) {
            storage.setItem(id, JSON.stringify(node));
            setMarkList([...markList, { node }]);
            setMarkState(true);

            setTimeout(() => {
                setMarkState(false);
            }, 500);
        } else {
            storage.removeItem(id);
            setMarkList(removeRestCodes);
        }
    };

    const handleScroll = function() {
        if (edges && getCurrentScrollPercentage() > 90) {
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
    };

    const handleScrollTop = () => setCodeList(initialCodeList);

    const handleCategory = (idx) => {
        setCategoryIdx(idx);
    };

    useEffect(() => {
        for (const [key, value] of Object.entries(storage)) {
            if (!isNaN(Number(key))) {
                const node = JSON.parse(value);

                bookmark.push({ node });
            }
        }

        setMarkList(bookmark);
        window.addEventListener(`scroll`, handleScroll, false);

        return () => window.removeEventListener(`scroll`, handleScroll);
    }, []);

    if (searchValue) {
        searchCodes = edges.filter((item) =>
            searchValue.includes(item.node.char)
        );

        codes = searchCodes;
    }

    if (markList.length !== 0) {
        const id = markList.map((item) => item.node.id);

        markRestCodes = codes.filter((item) => !id.includes(item.node.id));
        searchValue
            ? (codes = searchCodes)
            : (codes = [...markList, ...markRestCodes]);
    }

    return (
        <Layout>
            <SEO title="Home" />
            {copyState && <Message message={`Copied to Clipboard! 😊`} />}
            {markState && <Message message={`Added to the bookmark! ⭐️`} />}
            <Search handleSearch={handleSearch} />
            {!searchValue && <Category handleCategory={handleCategory} />}
            <CodeContainer>
                {codes.length !== 0 ? (
                    codes.map(({ node }, index) => (
                        <CodeItem
                            node={node}
                            handleCopy={handleCopy}
                            handleMark={handleMark}
                            key={index}
                        >
                            {!searchValue ? (
                                index < markList.length ? (
                                    <img src={marked} alt="marked" />
                                ) : (
                                    <img src={unmarked} alt="unmarked" />
                                )
                            ) : markList
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
