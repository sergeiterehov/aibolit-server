import Sequelize, { QueryInterface, TEXT } from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("indicators", "value", {
        type: TEXT,
    });
}

async function down(queryInterface: QueryInterface) {
    // DOWN
}

module.exports = { up, down };
