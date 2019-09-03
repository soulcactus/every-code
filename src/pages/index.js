import React from "react";
import { graphql } from "gatsby";

import Layout from "components/Layout";
import SEO from "components/seo";
import { CodeContainer } from "components/CodeContainer";
import { CodeItem } from "components/CodeItem";

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

    return (
        <Layout>
            <SEO title="Home" />
            <CodeContainer>
                {codes.map(({ node }, index) => (
                    <CodeItem node={node} key={index} />
                ))}
            </CodeContainer>
        </Layout>
    );
};

export default IndexPage;
