import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "components/Layout";
import SEO from "components/seo";
import CodeContainer from "components/CodeContainer";
import CodeItem from "components/CodeItem";
import Search from "components/Search";
import Message from "components/Message";
import unmarked from "images/bookmark-unmarked.svg";
import marked from "images/bookmark-marked.svg";

export const data = graphql`
    query {
        allStandardCharacterCsv {
            edges {
                node {
                    id
                    char
                    cssCode
                    htmlCode
                    hexCode
                    htmlEntity
                    description
                }
            }
        }
    }
`;

const IndexPage = ({ data }) => {
    const storage = window.localStorage;
    const edges = data.allStandardCharacterCsv.edges;
    const [searchValue, setSearchValue] = useState("");
    const [clickState, setClickState] = useState(false);
    const [markList, setMarkList] = useState([]);
    let bookmark = [];
    let codes;
    let searchCodes;
    let searchRestCodes;
    let markRestCodes;

    const handleSearch = (searchValue) => {
        setSearchValue(searchValue);
    };

    const handleCopy = (code) => {
        const dummy = document.createElement("textarea");

        document.body.appendChild(dummy);
        dummy.value = code;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        setClickState(true);

        setTimeout(() => {
            setClickState(false);
        }, 500);
    };

    const handleMark = (node) => {
        const id = node.id;
        const overlapCode = markList.filter((item) => id === item.node.id);
        const removeRestCodes = markList.filter((item) => id !== item.node.id);

        if (overlapCode.length === 0) {
            setMarkList([...markList, { node }]);
            localStorage.setItem(id, JSON.stringify(node));
        } else {
            setMarkList([...removeRestCodes]);
            localStorage.removeItem(id);
        }
    };

    useEffect(() => {
        setMarkList(bookmark);
    }, []);

    edges[0].node.char = ` `;

    for (const [key, value] of Object.entries(storage)) {
        if (!isNaN(Number(key))) {
            const node = JSON.parse(value);

            bookmark.push({ node });
        }
    }

    if (searchValue) {
        searchCodes = edges.filter((item) =>
            searchValue.includes(item.node.char)
        );

        searchRestCodes = edges.filter(
            (item) => !searchValue.includes(item.node.char)
        );

        codes = searchCodes.concat(searchRestCodes);
    } else {
        codes = edges;
    }

    if (markList.length !== 0) {
        const id = markList.map((item) => item.node.id);

        markRestCodes = codes.filter((item) => !id.includes(item.node.id));
        codes = markList.concat(markRestCodes);
    }

    return (
        <Layout>
            <SEO title="Home" />
            {clickState && <Message message={`Copied to Clipboard! 😊`} />}
            <Search handleSearch={handleSearch} />
            <CodeContainer>
                {codes.map(({ node }, index) => (
                    <CodeItem
                        node={node}
                        handleCopy={handleCopy}
                        handleMark={handleMark}
                        key={index}
                    >
                        {index < markList.length ? (
                            <img src={marked} alt="marked" />
                        ) : (
                            <img src={unmarked} alt="unmarked" />
                        )}
                    </CodeItem>
                ))}
            </CodeContainer>
        </Layout>
    );
};

IndexPage.propTypes = {
    data: PropTypes.object.isRequired
};

export default IndexPage;
