const metaConfig = require("./gatsby-meta-config");
const path = require("path");

module.exports = {
    siteMetadata: metaConfig,
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`
            }
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `data`,
                path: `${__dirname}/src/data/`
            }
        },
        {
            resolve: `gatsby-transformer-csv`,
            options: {
                noheader: false
            }
        },
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                sassRuleTest: /\.global\.s(a|c)ss$/,
                debug: true,
                sourceMap: true,
                useResolveUrlLoader: true,
                includePaths: [""],
                cssLoaderOptions: {
                    camelCase: false
                }
            }
        },
        "gatsby-plugin-root-import",
        {
            resolve: "gatsby-plugin-root-import",
            options: {
                static: path.join(__dirname, "static"),
                components: path.join(__dirname, "src/components"),
                pages: path.join(__dirname, "src/pages"),
                styles: path.join(__dirname, "src/styles")
            }
        }
    ]
};
