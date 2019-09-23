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
                                content: data.site.siteMetadata.description
                            },
                            {
                                property: `og:title`,
                                content: title
                            },
                            {
                                property: `og:image`,
                                content: data.site.siteMetadata.image
                            },
                            {
                                property: `og:description`,
                                content: data.site.siteMetadata.description
                            },
                            {
                                property: `og:type`,
                                content: `website`
                            },
                            {
                                name: `twitter:card`,
                                content: `summary`
                            },
                            {
                                name: `twitter:creator`,
                                content: data.site.siteMetadata.author
                            },
                            {
                                name: `twitter:title`,
                                content: title
                            },
                            {
                                name: `twitter:description`,
                                content: metaDescription
                            }
                        ]
                            .concat(
                                keywords.length > 0
                                    ? {
                                          name: `keywords`,
                                          content: keywords.join(`, `)
                                      }
                                    : []
                            )
                            .concat(meta)}
                    >
                        <meta charSet="utf-8" />
                        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1, maximum-scale=2"
                        />
                        <meta
                            name="google-site-verification"
                            content="CuSkWObnLIgbk3n4J-eSJiQ6w1pt-MtfZYo3s2dOHaI"
                        />
                    </Helmet>
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
