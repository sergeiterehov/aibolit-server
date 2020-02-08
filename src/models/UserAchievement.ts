import {
    Model,
    DATE,
    STRING,
    FLOAT,
    INTEGER
} from "sequelize";
import { telemedDB } from "../databases/telemed";
import { Achievement } from "./Achievement";

export class UserAchievement extends Model {
    id!: number;
    userId!: number;
    achievementId!: number;
    doneAt!: Date | undefined;

    Achievement!: Achievement | undefined;

    toJSON() {
        const result: any = this.get();

        delete result.updatedAt;

        return result;
    }
}

UserAchievement.init({
    userId: {
        type: INTEGER,
        references: {
            model: "users",
            key: "id",
        }
    },
    achievementId: {
        type: INTEGER,
        references: {
            model: "achievements",
            key: "id",
        }
    },
    doneAt: DATE,
}, {
    sequelize: telemedDB,
    tableName: "user_achievements"
});
