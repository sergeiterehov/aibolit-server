"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable("messages", {
        id: {
            type: sequelize_1.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: sequelize_1.DATE,
        updatedAt: sequelize_1.DATE,
        fromUserId: {
            type: sequelize_1.INTEGER,
            references: {
                model: "users",
                key: "id"
            },
            allowNull: false
        },
        toUserId: {
            type: sequelize_1.INTEGER,
            references: {
                model: "users",
                key: "id"
            },
            allowNull: false
        },
        text: {
            type: sequelize_1.TEXT
        }
    });
    await queryInterface.addIndex("messages", ["fromUserId", "toUserId"], {
        name: "messages_from_to"
    });
    await queryInterface.addIndex("messages", ["toUserId", "fromUserId"], {
        name: "messages_to_from"
    });
}
async function down(queryInterface) {
    await queryInterface.dropTable("messages");
}
module.exports = { up, down };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAxOTEyMTQxNjM4MzctY2hhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9taWdyYXRpb25zLzIwMTkxMjE0MTYzODM3LWNoYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBMkU7QUFFM0UsS0FBSyxVQUFVLEVBQUUsQ0FBQyxjQUE4QjtJQUM1QyxNQUFNLGNBQWMsQ0FBQyxXQUFXLENBQzVCLFVBQVUsRUFDVjtRQUNJLEVBQUUsRUFBRTtZQUNBLElBQUksRUFBRSxtQkFBTztZQUNiLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGFBQWEsRUFBRSxJQUFJO1NBQ3RCO1FBQ0QsU0FBUyxFQUFFLGdCQUFJO1FBQ2YsU0FBUyxFQUFFLGdCQUFJO1FBQ2YsVUFBVSxFQUFFO1lBQ1IsSUFBSSxFQUFFLG1CQUFPO1lBQ2IsVUFBVSxFQUFFO2dCQUNSLEtBQUssRUFBRSxPQUFPO2dCQUNkLEdBQUcsRUFBRSxJQUFJO2FBQ1o7WUFDRCxTQUFTLEVBQUUsS0FBSztTQUNuQjtRQUNELFFBQVEsRUFBRTtZQUNOLElBQUksRUFBRSxtQkFBTztZQUNiLFVBQVUsRUFBRTtnQkFDUixLQUFLLEVBQUUsT0FBTztnQkFDZCxHQUFHLEVBQUUsSUFBSTthQUNaO1lBQ0QsU0FBUyxFQUFFLEtBQUs7U0FDbkI7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsZ0JBQUk7U0FDYjtLQUNKLENBQ0osQ0FBQztJQUVGLE1BQU0sY0FBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLEVBQUU7UUFDbEUsSUFBSSxFQUFFLGtCQUFrQjtLQUMzQixDQUFDLENBQUM7SUFDSCxNQUFNLGNBQWMsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxFQUFFO1FBQ2xFLElBQUksRUFBRSxrQkFBa0I7S0FDM0IsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELEtBQUssVUFBVSxJQUFJLENBQUMsY0FBOEI7SUFDOUMsTUFBTSxjQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDIn0=