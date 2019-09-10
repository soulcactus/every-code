import { useStaticQuery, graphql } from "gatsby";

export const standardData = () => {
    const { allCode } = useStaticQuery(
        graphql`
            query StandardDataQuery {
                allCode(
                    filter: {
                        catecory: { eq: "UTF-8 C0 Controls and Basic Latin" }
                    }
                ) {
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
        `
    );

    return allCode.edges;
};

export const latinSupplementData = () => {
    const { allCode } = useStaticQuery(
        graphql`
            query LatinSupplementDataQuery {
                allCode(
                    filter: {
                        catecory: {
                            eq: "UTF-8 C1 Controls and Latin1 Supplement"
                        }
                    }
                ) {
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
        `
    );

    return allCode.edges;
};

export const latinExtendedData = () => {
    const { allCode } = useStaticQuery(
        graphql`
            query LatinExtendedDataQuery {
                allCode(
                    filter: {
                        catecory: {
                            in: [
                                "UTF-8 Latin Extended A"
                                "UTF-8 Latin Extended B"
                            ]
                        }
                    }
                ) {
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
        `
    );

    return allCode.edges;
};

export const modifierLettersData = () => {
    const { allCode } = useStaticQuery(
        graphql`
            query ModifierLettersDataQuery {
                allCode(
                    filter: {
                        catecory: { eq: "UTF-8 Spacing Modifier Letters" }
                    }
                ) {
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
        `
    );

    return allCode.edges;
};

export const diacriticalMarksData = () => {
    const { allCode } = useStaticQuery(
        graphql`
            query DiacriticalMarksDataQuery {
                allCode(
                    filter: { catecory: { eq: "UTF-8 Diacritical Marks" } }
                ) {
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
        `
    );

    return allCode.edges;
};
