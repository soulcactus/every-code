const metaConfig = require("./gatsby-meta-config");
const path = require("path");
const {
    NODE_ENV,
    URL: NETLIFY_SITE_URL = "https://www.example.com",
    DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
    CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === "production";
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

module.exports = {
    siteMetadata: metaConfig,
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: metaConfig.title,
                short_name: metaConfig.title,
                start_url: `/`,
                background_color: `#f9f9f9`,
                theme_color: `#2d3037`,
                display: `minimal-ui`,
                icon: metaConfig.icon
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `data`,
                path: `${__dirname}/src/data/`
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
                includePaths: [``],
                cssLoaderOptions: {
                    camelCase: false
                }
            }
        },
        `gatsby-plugin-root-import`,
        {
            resolve: `gatsby-plugin-root-import`,
            options: {
                components: path.join(__dirname, `src/components`),
                pages: path.join(__dirname, `src/pages`),
                styles: path.join(__dirname, `src/styles`),
                images: path.join(__dirname, `src/images`),
                hooks: path.join(__dirname, `src/hooks`)
            }
        },
        {
            resolve: "gatsby-plugin-robots-txt",
            options: {
                resolveEnv: () => NETLIFY_ENV,
                env: {
                    production: {
                        policy: [{ userAgent: "*" }]
                    },
                    "branch-deploy": {
                        policy: [{ userAgent: "*", disallow: ["/"] }],
                        sitemap: null,
                        host: null
                    },
                    "deploy-preview": {
                        policy: [{ userAgent: "*", disallow: ["/"] }],
                        sitemap: null,
                        host: null
                    }
                }
            }
        }
    ]
};
