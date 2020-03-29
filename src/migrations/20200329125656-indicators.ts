import Sequelize, { QueryInterface, INTEGER, DATE, STRING } from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable("indicators", {
        id: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        createdAt: DATE,
        updatedAt: DATE,
        userId: {
            type: INTEGER,
            references: {
                model: "users",
                key: "id",
            },
            allowNull: true,
        },
        key: {
            type: STRING,
            allowNull: false,
        },
        value: {
            type: STRING,
            allowNull: false,
            defaultValue: "",
        },
        expiredAt: DATE,
    });
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("indicators");
}

module.exports = { up, down };
