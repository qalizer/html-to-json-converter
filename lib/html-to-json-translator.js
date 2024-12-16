const { JSDOM } = require('jsdom');

function html_to_json(html_string) {
    const dom = new JSDOM(html_string);
    const document = dom.window.document;
    const json = {};

    function traverse(node, obj) {
        const tag = node.tagName.toLowerCase();
        if (!obj[tag]) {
            obj[tag] = [];
        }
        const attributes = {};
        for (let attr of node.attributes) {
            attributes[attr.name] = attr.value;
        }
        const element = {
            attributes: attributes,
            text: node.textContent.trim()
        };
        obj[tag].push(element);

        node.childNodes.forEach(child => {
            if (child.nodeType === 1) {
                // Element node
                traverse(child, element);
            }
        });
    }

    traverse(document.documentElement, json);
    return json;
}

module.exports = html_to_json;