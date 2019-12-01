import {
    Model,
    DATE,
    STRING,
    FLOAT,
    INTEGER
} from "sequelize";
import { telemedDB } from "../databases/telemed";

export class HealthHeight extends Model {
    val!: number;
    date!: Date;
    device!: string;
    userId!: number;
}

HealthHeight.init({
    userId: INTEGER,
    date: DATE,
    device: STRING,
    val: FLOAT,
}, {
    sequelize: telemedDB,
    tableName: "health_heights"
});
