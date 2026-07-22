const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

const html = fs.readFileSync("index.html", "utf8");

const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", (err) => {
  console.log("JSDOM Error:", err ? err.message : err);
});
virtualConsole.on("jsdomError", (err) => {
  console.log("JSDOM Internal Error:", err.message);
});
virtualConsole.on("warn", (warn) => {
  console.log("JSDOM Warn:", warn);
});
virtualConsole.on("info", (info) => {
  console.log("JSDOM Info:", info);
});
virtualConsole.on("log", (log) => {
  console.log("JSDOM Log:", log);
});

const dom = new JSDOM(html, { 
    runScripts: "dangerously", 
    resources: "usable",
    virtualConsole
});

setTimeout(() => {
    console.log("Done waiting for scripts");
}, 5000);
