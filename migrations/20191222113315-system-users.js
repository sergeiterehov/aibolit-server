"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.bulkInsert("users", [
        {
            id: -1,
            email: "system"
        }
    ]);
}
async function down(queryInterface) {
    await queryInterface.bulkDelete("users", {
        id: { [sequelize_1.default.Op.in]: [
                -1,
            ] }
    });
}
module.exports = { up, down };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAxOTEyMjIxMTMzMTUtc3lzdGVtLXVzZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21pZ3JhdGlvbnMvMjAxOTEyMjIxMTMzMTUtc3lzdGVtLXVzZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXNEO0FBRXRELEtBQUssVUFBVSxFQUFFLENBQUMsY0FBOEI7SUFDNUMsTUFBTSxjQUFjLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTtRQUNyQztZQUNJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDTixLQUFLLEVBQUUsUUFBUTtTQUNsQjtLQUNKLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxLQUFLLFVBQVUsSUFBSSxDQUFDLGNBQThCO0lBQzlDLE1BQU0sY0FBYyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7UUFDckMsRUFBRSxFQUFFLEVBQUMsQ0FBQyxtQkFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDcEIsQ0FBQyxDQUFDO2FBQ0wsRUFBQztLQUNMLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDIn0=