import Sequelize, { QueryInterface } from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("users", "secureKey", {
        type: Sequelize.STRING,
        allowNull: true,
    });
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("users", "secureKey");
}

module.exports = { up, down };
