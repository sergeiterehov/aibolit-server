"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.changeColumn("indicators", "value", {
        type: sequelize_1.TEXT
    });
}
async function down(queryInterface) {
    // DOWN
}
module.exports = { up, down };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMDAzMjkxNjAxNDQtaW5kaWNhdG9yLXZhbHVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21pZ3JhdGlvbnMvMjAyMDAzMjkxNjAxNDQtaW5kaWNhdG9yLXZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQTREO0FBRTVELEtBQUssVUFBVSxFQUFFLENBQUMsY0FBOEI7SUFDNUMsTUFBTSxjQUFjLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUU7UUFDckQsSUFBSSxFQUFFLGdCQUFJO0tBQ2IsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELEtBQUssVUFBVSxJQUFJLENBQUMsY0FBOEI7SUFDOUMsT0FBTztBQUNYLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDIn0=