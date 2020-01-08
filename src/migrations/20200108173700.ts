import Sequelize, { QueryInterface } from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query("ALTER TABLE `messages` MODIFY `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;")
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query("ALTER TABLE `messages` MODIFY `text` text CHARACTER SET utf8 COLLATE utf8_general_ci;")
}

module.exports = { up, down };
