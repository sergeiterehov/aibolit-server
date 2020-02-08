const ts = require("typescript");
const path = require("path");
const fs = require("fs");

const root = path.resolve(__dirname, "../");

function buildMigrations() {
    const files = fs.readdirSync(path.resolve(root, "src/migrations"))
    .filter((file) => /\.ts$/)
    .map((file) => path.resolve(root, "src/migrations", file));

    console.log(files);

    const x = ts.createProgram(files, {
        outDir: path.resolve(root, "migrations"),
        target: "esNext",
        inlineSourceMap: true,
    });

    console.log(x.emit());
}

buildMigrations();
