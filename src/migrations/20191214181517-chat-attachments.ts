import Sequelize, { QueryInterface, INTEGER, DATE, TEXT } from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable(
        "message_attachments",
        {
            id: {
                type: INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            createdAt: DATE,
            updatedAt: DATE,
            messageId: {
                type: INTEGER,
                references: {
                    model: "messages",
                    key: "id",
                },
            },
            type: {
                type: INTEGER,
            },
            resource: {
                type: TEXT,
            },
        },
    );

    await queryInterface.addIndex("message_attachments", ["messageId"], {
        name: "message_atacnments_messageId_i",
    });
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("message_attachments");
}

module.exports = { up, down };
