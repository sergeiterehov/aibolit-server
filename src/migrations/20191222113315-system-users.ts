import Sequelize, { QueryInterface } from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("users", [
        {
            id: -1,
            email: "system",
        }
    ]);
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("users", {
        id: {[Sequelize.Op.in]: [
            -1,
        ]},
    })
}

module.exports = { up, down };
