import React, { useState } from "react";
import { graphql } from "gatsby";

import Layout from "components/Layout";
import SEO from "components/seo";
import CodeContainer from "components/CodeContainer";
import CodeItem from "components/CodeItem";
import Search from "components/Search";
import Message from "components/Message";

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
    const codes = data.allStandardCharacterCsv.edges;
    const [value, setValue] = useState("");
    const [clickState, setClickState] = useState(false);

    const searchChange = (value) => {
        setValue(value);
    };

    const copyCode = (code, clickState = true) => {
        const dummy = document.createElement("textarea");

        document.body.appendChild(dummy);
        dummy.value = code;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        setClickState(clickState);

        setTimeout(() => {
            setClickState(false);
        }, 500);
    };

    let searchCodes;
    let restCodes;
    let newCodes;

    codes[0].node.char = " ";

    if (value) {
        searchCodes = codes.filter((item) => value.includes(item.node.char));
        restCodes = codes.filter((item) => !value.includes(item.node.char));
        newCodes = searchCodes.concat(restCodes);
    } else {
        newCodes = codes;
    }

    return (
        <Layout>
            <SEO title="Home" />
            {clickState === true && (
                <Message message={`Copied to Clipboard! 😊`} />
            )}
            <Search searchChange={searchChange} />
            <CodeContainer>
                {newCodes.map(({ node }, index) => (
                    <CodeItem node={node} copyCode={copyCode} key={index} />
                ))}
            </CodeContainer>
        </Layout>
    );
};

export default IndexPage;
