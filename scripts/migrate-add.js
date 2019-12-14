const path = require("path");
const fs = require("fs");
const moment = require("moment");
const template = `import Sequelize, { QueryInterface } from "sequelize";

async function up(queryInterface: QueryInterface) {
    // UP
}

async function down(queryInterface: QueryInterface) {
    // DOWN
}

module.exports = { up, down };
`;

const filePath = path.resolve(__dirname, "../src/migrations", `${moment().format("YYYYMMDDHHmmss")}.ts`);

fs.writeFileSync(
    filePath,
    template,
    "UTF-8",
);

console.log(filePath);
