const crypto = require("crypto");
const data = require("./src/data/data.json");

exports.sourceNodes = ({ actions }) => {
    const { createNode } = actions;

    data.map((code) => {
        const content = {
            id: code.id,
            char: code.char,
            name: code.name,
            catecory: code.catecory,
            htmlEntity: code.htmlEntity,
            htmlCode: code.htmlCode,
            hexCode: code.hexCode,
            cssCode: code.cssCode
        };

        const nodeContent = JSON.stringify(content);

        createNode({
            ...content,
            parent: null,
            children: [],
            internal: {
                type: `code`,
                content: nodeContent,
                contentDigest: crypto
                    .createHash("md5")
                    .update(nodeContent)
                    .digest("hex")
            }
        });
    });
};
