import Sequelize, { QueryInterface } from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("message_attachments", "resourceId", {
        type: Sequelize.INTEGER,
        allowNull: true,
    });

    await queryInterface.addIndex("message_attachments", ["resourceId"], {
        name: "attachemnts_resource_id",
    });
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.removeIndex("message_attachments", "attachemnts_resource_id");

    await queryInterface.removeColumn("message_attachments", "resourceId");
}

module.exports = { up, down };
