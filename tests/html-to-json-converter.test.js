const html_to_json = require('../src/html-to-json-converter');
const fs = require('fs');

test('Basic html file', () => {
    const source = fs.readFileSync('./tests/samples/basic.html', 'utf-8');
    const expected = JSON.parse(fs.readFileSync('./tests/samples/basic.json', 'utf-8'));
    const actual = html_to_json(source);
    expect(actual).toEqual(expected);
});