import {
    Model,
    DATE,
    STRING,
    FLOAT,
    INTEGER
} from "sequelize";
import { telemedDB } from "../databases/telemed";

export class HealthWeight extends Model {
    val!: number;
    date!: Date;
    device!: string;
    userId!: number;
}

HealthWeight.init({
    userId: INTEGER,
    date: DATE,
    device: STRING,
    val: FLOAT,
}, {
    sequelize: telemedDB,
    tableName: "health_weights"
});
