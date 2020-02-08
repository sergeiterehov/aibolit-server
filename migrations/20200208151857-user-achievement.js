"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
async function up(queryInterface) {
    await queryInterface.createTable("achievements", {
        id: {
            type: sequelize_1.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        createdAt: sequelize_1.DATE,
        updatedAt: sequelize_1.DATE,
        key: {
            type: sequelize_1.STRING
        }
    });
    await queryInterface.bulkInsert("achievements", [
        "hi",
        "what-is-your-problem",
        "just-question",
        "hi-how-are-you",
        "beginner",
        "middle",
        "senior",
        "normal-bmi-1",
        "normal-bmi-2",
        "normal-bmi-3",
        "normal-bmi-4",
        "pedestrian-1",
        "pedestrian-2",
        "pedestrian-3",
        "pedestrian-4",
        "pedestrian-5",
    ].map((key) => ({
        key,
        createdAt: new Date(),
        updatedAt: new Date()
    })));
    await queryInterface.createTable("user_achievements", {
        id: {
            type: sequelize_1.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        createdAt: sequelize_1.DATE,
        updatedAt: sequelize_1.DATE,
        userId: {
            type: sequelize_1.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        achievementId: {
            type: sequelize_1.INTEGER,
            allowNull: false,
            references: {
                model: "achievements",
                key: "id"
            }
        },
        doneAt: {
            type: sequelize_1.DATE,
            allowNull: true
        }
    });
    await queryInterface.addConstraint("user_achievements", ["userId", "achievementId"], { type: 'unique' });
}
async function down(queryInterface) {
    await queryInterface.dropTable("user_achievements");
    await queryInterface.dropTable("achievements");
}
module.exports = { up, down };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAyMDAyMDgxNTE4NTctdXNlci1hY2hpZXZlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9taWdyYXRpb25zLzIwMjAwMjA4MTUxODU3LXVzZXItYWNoaWV2ZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBNkU7QUFFN0UsS0FBSyxVQUFVLEVBQUUsQ0FBQyxjQUE4QjtJQUM1QyxNQUFNLGNBQWMsQ0FBQyxXQUFXLENBQzVCLGNBQWMsRUFDZDtRQUNJLEVBQUUsRUFBRTtZQUNBLElBQUksRUFBRSxtQkFBTztZQUNiLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFVBQVUsRUFBRSxJQUFJO1NBQ25CO1FBQ0QsU0FBUyxFQUFFLGdCQUFJO1FBQ2YsU0FBUyxFQUFFLGdCQUFJO1FBQ2YsR0FBRyxFQUFFO1lBQ0QsSUFBSSxFQUFFLGtCQUFNO1NBQ2Y7S0FDSixDQUNKLENBQUM7SUFFRixNQUFNLGNBQWMsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFO1FBQzVDLElBQUk7UUFDSixzQkFBc0I7UUFDdEIsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixVQUFVO1FBQ1YsUUFBUTtRQUNSLFFBQVE7UUFDUixjQUFjO1FBQ2QsY0FBYztRQUNkLGNBQWM7UUFDZCxjQUFjO1FBQ2QsY0FBYztRQUNkLGNBQWM7UUFDZCxjQUFjO1FBQ2QsY0FBYztRQUNkLGNBQWM7S0FDakIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDWixHQUFHO1FBQ0gsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO1FBQ3JCLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtLQUN4QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUwsTUFBTSxjQUFjLENBQUMsV0FBVyxDQUM1QixtQkFBbUIsRUFDbkI7UUFDSSxFQUFFLEVBQUU7WUFDQSxJQUFJLEVBQUUsbUJBQU87WUFDYixhQUFhLEVBQUUsSUFBSTtZQUNuQixVQUFVLEVBQUUsSUFBSTtTQUNuQjtRQUNELFNBQVMsRUFBRSxnQkFBSTtRQUNmLFNBQVMsRUFBRSxnQkFBSTtRQUNmLE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxtQkFBTztZQUNiLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFVBQVUsRUFBRTtnQkFDUixLQUFLLEVBQUUsT0FBTztnQkFDZCxHQUFHLEVBQUUsSUFBSTthQUNaO1NBQ0o7UUFDRCxhQUFhLEVBQUU7WUFDWCxJQUFJLEVBQUUsbUJBQU87WUFDYixTQUFTLEVBQUUsS0FBSztZQUNoQixVQUFVLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLGNBQWM7Z0JBQ3JCLEdBQUcsRUFBRSxJQUFJO2FBQ1o7U0FDSjtRQUNELE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxnQkFBSTtZQUNWLFNBQVMsRUFBRSxJQUFJO1NBQ2xCO0tBQ0osQ0FDSixDQUFDO0lBRUYsTUFBTSxjQUFjLENBQUMsYUFBYSxDQUFDLG1CQUFtQixFQUFFLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDN0csQ0FBQztBQUVELEtBQUssVUFBVSxJQUFJLENBQUMsY0FBOEI7SUFDOUMsTUFBTSxjQUFjLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDcEQsTUFBTSxjQUFjLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDIn0=