"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function up(queryInterface) {
    await queryInterface.bulkInsert("achievements", [
        "regular-customer",
        "i-love-walking",
    ].map((key) => ({
        key,
        createdAt: new Date(),
        updatedAt: new Date()
    })));
}
async function down(queryInterface) {
    // DONW
}
module.exports = { up, down };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMDAyMjIxNTI4MzYtbmV3LWFjaGlldmVtZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9taWdyYXRpb25zLzIwMjAwMjIyMTUyODM2LW5ldy1hY2hpZXZlbWVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxLQUFLLFVBQVUsRUFBRSxDQUFDLGNBQThCO0lBQzVDLE1BQU0sY0FBYyxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUU7UUFDNUMsa0JBQWtCO1FBQ2xCLGdCQUFnQjtLQUNuQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNaLEdBQUc7UUFDSCxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7UUFDckIsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO0tBQ3hCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDVCxDQUFDO0FBRUQsS0FBSyxVQUFVLElBQUksQ0FBQyxjQUE4QjtJQUM5QyxPQUFPO0FBQ1gsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMifQ==