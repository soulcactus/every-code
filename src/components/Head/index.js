import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

const detailsQuery = graphql`
    query DefaultSEOQuery {
        site {
            siteMetadata {
                title
                description
                author
                image
                keywords
            }
        }
    }
`;

const Head = ({ description, lang, meta, keywords, title }) => {
    return (
        <StaticQuery
            query={detailsQuery}
            render={(data) => {
                const metaDescription =
                    description || data.site.siteMetadata.description;

                return (
                    <Helmet
                        htmlAttributes={{
                            lang
                        }}
                        title={title}
                        titleTemplate={`${data.site.siteMetadata.title}`}
                        meta={[
                            {
                                name: `description`,
                                content: metaDescription
                            },
                            {
                                property: `og:title`,
                                content: data.site.siteMetadata.title
                            },
                            {
                                property: `og:image`,
                                content: data.site.siteMetadata.image
                            },
                            {
                                property: `og:description`,
                                content: metaDescription
                            },
                            {
                                property: `og:type`,
                                content: `website`
                            },
                            {
                                name: `google-site-verification`,
                                content: `CuSkWObnLIgbk3n4J-eSJiQ6w1pt-MtfZYo3s2dOHaI`
                            }
                        ]
                            .concat(
                                data.site.siteMetadata.keywords.length > 0
                                    ? {
                                          name: `keywords`,
                                          content: data.site.siteMetadata.keywords.join(
                                              `, `
                                          )
                                      }
                                    : []
                            )
                            .concat(meta)}
                    />
                );
            }}
        />
    );
};

Head.defaultProps = {
    lang: `en`,
    meta: [],
    keywords: []
};

Head.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.array,
    keywords: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired
};

export default Head;
