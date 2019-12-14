import Sequelize, { QueryInterface, INTEGER, DATE } from "sequelize/types";
import { User } from "../models/User";

async function up(queryInterface: QueryInterface) {
    queryInterface.createTable(
        "messages",
        {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            createdAt: DATE,
            updatedAt: DATE,
            fromUserId: {
                type: INTEGER,
                references: {
                    model: User,
                    key: "id",
                },
                allowNull: false,
            }
        },
    )
}

async function down(queryInterface: QueryInterface) {
    queryInterface.dropTable("messages");
}

module.exports = { up, down };
