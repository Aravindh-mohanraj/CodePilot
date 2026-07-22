const fs = require('fs');
const babel = require('@babel/core'); // or just use acorn to check JS syntax

const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);

if (match) {
    const code = match[1];
    try {
        const acorn = require('acorn');
        acorn.parse(code, { ecmaVersion: 2020, sourceType: 'script' });
        console.log("No syntax errors in script!");
    } catch (e) {
        // Fallback if acorn not available, try checking with new Function
        try {
            // Strip out JSX tags naively for basic test
            let noJsx = code.replace(/<[^>]+>/g, 'null');
            new Function(noJsx);
            console.log("No critical syntax errors (naively)");
        } catch(err) {
            console.log("Syntax error inside index.html script block:", err.message);
        }
    }
} else {
    console.log("Script block not found!");
}
