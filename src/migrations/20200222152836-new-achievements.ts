import Sequelize, { QueryInterface } from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("achievements", [
        "regular-customer",
        "i-love-walking",
    ].map((key) => ({
        key,
        createdAt: new Date(),
        updatedAt: new Date(),
    })));
}

async function down(queryInterface: QueryInterface) {
    // DONW
}

module.exports = { up, down };
