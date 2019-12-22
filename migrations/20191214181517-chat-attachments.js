"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable("message_attachments", {
        id: {
            type: sequelize_1.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        createdAt: sequelize_1.DATE,
        updatedAt: sequelize_1.DATE,
        messageId: {
            type: sequelize_1.INTEGER,
            references: {
                model: "messages",
                key: "id"
            }
        },
        type: {
            type: sequelize_1.INTEGER
        },
        resource: {
            type: sequelize_1.TEXT
        }
    });
    await queryInterface.addIndex("message_attachments", ["messageId"], {
        name: "message_atacnments_messageId_i"
    });
}
async function down(queryInterface) {
    await queryInterface.dropTable("message_attachments");
}
module.exports = { up, down };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAxOTEyMTQxODE1MTctY2hhdC1hdHRhY2htZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9taWdyYXRpb25zLzIwMTkxMjE0MTgxNTE3LWNoYXQtYXR0YWNobWVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBMkU7QUFFM0UsS0FBSyxVQUFVLEVBQUUsQ0FBQyxjQUE4QjtJQUM1QyxNQUFNLGNBQWMsQ0FBQyxXQUFXLENBQzVCLHFCQUFxQixFQUNyQjtRQUNJLEVBQUUsRUFBRTtZQUNBLElBQUksRUFBRSxtQkFBTztZQUNiLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFVBQVUsRUFBRSxJQUFJO1NBQ25CO1FBQ0QsU0FBUyxFQUFFLGdCQUFJO1FBQ2YsU0FBUyxFQUFFLGdCQUFJO1FBQ2YsU0FBUyxFQUFFO1lBQ1AsSUFBSSxFQUFFLG1CQUFPO1lBQ2IsVUFBVSxFQUFFO2dCQUNSLEtBQUssRUFBRSxVQUFVO2dCQUNqQixHQUFHLEVBQUUsSUFBSTthQUNaO1NBQ0o7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsbUJBQU87U0FDaEI7UUFDRCxRQUFRLEVBQUU7WUFDTixJQUFJLEVBQUUsZ0JBQUk7U0FDYjtLQUNKLENBQ0osQ0FBQztJQUVGLE1BQU0sY0FBYyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ2hFLElBQUksRUFBRSxnQ0FBZ0M7S0FDekMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELEtBQUssVUFBVSxJQUFJLENBQUMsY0FBOEI7SUFDOUMsTUFBTSxjQUFjLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMifQ==