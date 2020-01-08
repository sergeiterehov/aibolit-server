"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function up(queryInterface) {
    await queryInterface.sequelize.query("ALTER TABLE `messages` MODIFY `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;");
}
async function down(queryInterface) {
    await queryInterface.sequelize.query("ALTER TABLE `messages` MODIFY `text` text CHARACTER SET utf8 COLLATE utf8_general_ci;");
}
module.exports = { up, down };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMDAxMDgxNzM3MDAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbWlncmF0aW9ucy8yMDIwMDEwODE3MzcwMC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLEtBQUssVUFBVSxFQUFFLENBQUMsY0FBOEI7SUFDNUMsTUFBTSxjQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyw2RkFBNkYsQ0FBQyxDQUFBO0FBQ3ZJLENBQUM7QUFFRCxLQUFLLFVBQVUsSUFBSSxDQUFDLGNBQThCO0lBQzlDLE1BQU0sY0FBYyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsdUZBQXVGLENBQUMsQ0FBQTtBQUNqSSxDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyJ9