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
                siteUrl
                image
                keywords
            }
        }
    }
`;

function Head({ lang, meta, title }) {
    return (
        <>
            <Helmet>
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                ></script>
                <script>
                    {`(adsbygoogle = window.adsbygoogle || []).push({
                    google_ad_client: "ca-pub-2083709121130964",
                    enable_page_level_ads: true});`}
                </script>
            </Helmet>
            <StaticQuery
                query={detailsQuery}
                render={(data) => {
                    const metaDescription = data.site.siteMetadata.description;

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
                                    content: `${data.site.siteMetadata.siteUrl}${data.site.siteMetadata.image}`
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
        </>
    );
}

Head.defaultProps = {
    lang: `en`,
    meta: []
};

Head.propTypes = {
    lang: PropTypes.string,
    meta: PropTypes.array,
    title: PropTypes.string.isRequired
};

export default Head;
