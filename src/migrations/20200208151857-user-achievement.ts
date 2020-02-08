import Sequelize, { QueryInterface, INTEGER, STRING, DATE } from "sequelize";

async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable(
        "achievements",
        {
            id: {
                type: INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            createdAt: DATE,
            updatedAt: DATE,
            key: {
                type: STRING,
            },
        },
    );

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
        updatedAt: new Date(),
    })));

    await queryInterface.createTable(
        "user_achievements",
        {
            id: {
                type: INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            createdAt: DATE,
            updatedAt: DATE,
            userId: {
                type: INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            achievementId: {
                type: INTEGER,
                allowNull: false,
                references: {
                    model: "achievements",
                    key: "id",
                },
            },
            doneAt: {
                type: DATE,
                allowNull: true,
            },
        },
    );

    await queryInterface.addConstraint("user_achievements", ["userId", "achievementId"], { type: 'unique' });
}

async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("user_achievements");
    await queryInterface.dropTable("achievements");
}

module.exports = { up, down };
