import {
    Model,
    DATE,
    STRING,
    FLOAT,
    INTEGER
} from "sequelize";
import { telemedDB } from "../databases/telemed";

export class HealthMood extends Model {
    id!: number;
    smile!: string;
    date!: Date;
    device!: string;
    userId!: number;
}

HealthMood.init({
    userId: INTEGER,
    date: DATE,
    device: STRING,
    smile: STRING,
}, {
    sequelize: telemedDB,
    tableName: "health_moods"
});
