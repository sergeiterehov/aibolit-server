import Sequelize, { QueryInterface, INTEGER, DATE, TEXT } from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable(
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
                    model: "users",
                    key: "id",
                },
                allowNull: false,
            },
            toUserId: {
                type: INTEGER,
                references: {
                    model: "users",
                    key: "id",
                },
                allowNull: false,
            },
            text: {
                type: TEXT,
            }
        },
    );

    await queryInterface.addIndex("messages", ["fromUserId", "toUserId"], {
        name: "messages_from_to",
    });
    await queryInterface.addIndex("messages", ["toUserId", "fromUserId"], {
        name: "messages_to_from",
    });
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("messages");
}

module.exports = { up, down };
