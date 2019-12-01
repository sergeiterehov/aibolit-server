import {
    Model,
    DATE,
    STRING,
    FLOAT,
    INTEGER
} from "sequelize";
import { telemedDB } from "../databases/telemed";

export class HealthStep extends Model {
    val!: number;
    periodFrom!: Date;
    periodTo!: Date;
    device!: string;
    userId!: number;
}

HealthStep.init({
    userId: INTEGER,
    periodFrom: DATE,
    periodTo: DATE,
    device: STRING,
    val: FLOAT,
}, {
    sequelize: telemedDB,
    tableName: "health_steps"
});
