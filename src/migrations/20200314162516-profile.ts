import Sequelize, { QueryInterface } from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("users", "firstName", {
        type: Sequelize.STRING,
        allowNull: true,
    });
    await queryInterface.addColumn("users", "lastName", {
        type: Sequelize.STRING,
        allowNull: true,
    });
    await queryInterface.addColumn("users", "middleName", {
        type: Sequelize.STRING,
        allowNull: true,
    });

    await queryInterface.addColumn("users", "gender", {
        type: Sequelize.INTEGER,
        allowNull: true,
    });

    await queryInterface.addColumn("users", "birthDate", {
        type: Sequelize.DATEONLY,
        allowNull: true,
    });
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("users", "firstName");
    await queryInterface.removeColumn("users", "lastName");
    await queryInterface.removeColumn("users", "middleName");

    await queryInterface.removeColumn("users", "gender");

    await queryInterface.removeColumn("users", "birthDate");
}

module.exports = { up, down };
