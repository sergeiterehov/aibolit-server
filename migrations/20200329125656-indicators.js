"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable("indicators", {
        id: {
            type: sequelize_1.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        createdAt: sequelize_1.DATE,
        updatedAt: sequelize_1.DATE,
        userId: {
            type: sequelize_1.INTEGER,
            references: {
                model: "users",
                key: "id"
            },
            allowNull: true
        },
        key: {
            type: sequelize_1.STRING,
            allowNull: false
        },
        value: {
            type: sequelize_1.STRING,
            allowNull: false,
            defaultValue: ""
        },
        expiredAt: sequelize_1.DATE
    });
}
async function down(queryInterface) {
    await queryInterface.dropTable("indicators");
}
module.exports = { up, down };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMDAzMjkxMjU2NTYtaW5kaWNhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9taWdyYXRpb25zLzIwMjAwMzI5MTI1NjU2LWluZGljYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBNkU7QUFFN0UsS0FBSyxVQUFVLEVBQUUsQ0FBQyxjQUE4QjtJQUM1QyxNQUFNLGNBQWMsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFO1FBQzNDLEVBQUUsRUFBRTtZQUNBLElBQUksRUFBRSxtQkFBTztZQUNiLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFVBQVUsRUFBRSxJQUFJO1NBQ25CO1FBQ0QsU0FBUyxFQUFFLGdCQUFJO1FBQ2YsU0FBUyxFQUFFLGdCQUFJO1FBQ2YsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFLG1CQUFPO1lBQ2IsVUFBVSxFQUFFO2dCQUNSLEtBQUssRUFBRSxPQUFPO2dCQUNkLEdBQUcsRUFBRSxJQUFJO2FBQ1o7WUFDRCxTQUFTLEVBQUUsSUFBSTtTQUNsQjtRQUNELEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxrQkFBTTtZQUNaLFNBQVMsRUFBRSxLQUFLO1NBQ25CO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsSUFBSSxFQUFFLGtCQUFNO1lBQ1osU0FBUyxFQUFFLEtBQUs7WUFDaEIsWUFBWSxFQUFFLEVBQUU7U0FDbkI7UUFDRCxTQUFTLEVBQUUsZ0JBQUk7S0FDbEIsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELEtBQUssVUFBVSxJQUFJLENBQUMsY0FBOEI7SUFDOUMsTUFBTSxjQUFjLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDIn0=