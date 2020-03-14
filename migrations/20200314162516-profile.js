"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.addColumn("users", "firstName", {
        type: sequelize_1.default.STRING,
        allowNull: true
    });
    await queryInterface.addColumn("users", "lastName", {
        type: sequelize_1.default.STRING,
        allowNull: true
    });
    await queryInterface.addColumn("users", "middleName", {
        type: sequelize_1.default.STRING,
        allowNull: true
    });
    await queryInterface.addColumn("users", "gender", {
        type: sequelize_1.default.INTEGER,
        allowNull: true
    });
    await queryInterface.addColumn("users", "birthDate", {
        type: sequelize_1.default.DATEONLY,
        allowNull: true
    });
}
async function down(queryInterface) {
    await queryInterface.removeColumn("users", "firstName");
    await queryInterface.removeColumn("users", "lastName");
    await queryInterface.removeColumn("users", "middleName");
    await queryInterface.removeColumn("users", "gender");
    await queryInterface.removeColumn("users", "birthDate");
}
module.exports = { up, down };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMDAzMTQxNjI1MTYtcHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9taWdyYXRpb25zLzIwMjAwMzE0MTYyNTE2LXByb2ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBc0Q7QUFFdEQsS0FBSyxVQUFVLEVBQUUsQ0FBQyxjQUE4QjtJQUM1QyxNQUFNLGNBQWMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRTtRQUNqRCxJQUFJLEVBQUUsbUJBQVMsQ0FBQyxNQUFNO1FBQ3RCLFNBQVMsRUFBRSxJQUFJO0tBQ2xCLENBQUMsQ0FBQztJQUNILE1BQU0sY0FBYyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFO1FBQ2hELElBQUksRUFBRSxtQkFBUyxDQUFDLE1BQU07UUFDdEIsU0FBUyxFQUFFLElBQUk7S0FDbEIsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxjQUFjLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7UUFDbEQsSUFBSSxFQUFFLG1CQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsSUFBSTtLQUNsQixDQUFDLENBQUM7SUFFSCxNQUFNLGNBQWMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRTtRQUM5QyxJQUFJLEVBQUUsbUJBQVMsQ0FBQyxPQUFPO1FBQ3ZCLFNBQVMsRUFBRSxJQUFJO0tBQ2xCLENBQUMsQ0FBQztJQUVILE1BQU0sY0FBYyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFO1FBQ2pELElBQUksRUFBRSxtQkFBUyxDQUFDLFFBQVE7UUFDeEIsU0FBUyxFQUFFLElBQUk7S0FDbEIsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELEtBQUssVUFBVSxJQUFJLENBQUMsY0FBOEI7SUFDOUMsTUFBTSxjQUFjLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN4RCxNQUFNLGNBQWMsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sY0FBYyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFFekQsTUFBTSxjQUFjLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUVyRCxNQUFNLGNBQWMsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDIn0=