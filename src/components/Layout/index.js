import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import "./index.scss";
import Header from "components/Header";

function Layout({ children }) {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    return (
        <>
            <Header siteTitle={data.site.siteMetadata.title} />
            <div className="content-wrap">
                <main>{children}</main>
            </div>
            <footer>
                Copyright &copy; 2019 Soulcactus&#46; All right reserved&#46;
            </footer>
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
