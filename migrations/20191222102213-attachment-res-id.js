"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.addColumn("message_attachments", "resourceId", {
        type: sequelize_1.default.INTEGER,
        allowNull: true
    });
    await queryInterface.addIndex("message_attachments", ["resourceId"], {
        name: "attachemnts_resource_id"
    });
}
async function down(queryInterface) {
    await queryInterface.removeIndex("message_attachments", "attachemnts_resource_id");
    await queryInterface.removeColumn("message_attachments", "resourceId");
}
module.exports = { up, down };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAxOTEyMjIxMDIyMTMtYXR0YWNobWVudC1yZXMtaWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbWlncmF0aW9ucy8yMDE5MTIyMjEwMjIxMy1hdHRhY2htZW50LXJlcy1pZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFzRDtBQUV0RCxLQUFLLFVBQVUsRUFBRSxDQUFDLGNBQThCO0lBQzVDLE1BQU0sY0FBYyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxZQUFZLEVBQUU7UUFDaEUsSUFBSSxFQUFFLG1CQUFTLENBQUMsT0FBTztRQUN2QixTQUFTLEVBQUUsSUFBSTtLQUNsQixDQUFDLENBQUM7SUFFSCxNQUFNLGNBQWMsQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUNqRSxJQUFJLEVBQUUseUJBQXlCO0tBQ2xDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxLQUFLLFVBQVUsSUFBSSxDQUFDLGNBQThCO0lBQzlDLE1BQU0sY0FBYyxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0lBRW5GLE1BQU0sY0FBYyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUMzRSxDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyJ9