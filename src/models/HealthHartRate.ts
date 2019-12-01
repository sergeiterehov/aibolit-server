import {
    Model,
    DATE,
    STRING,
    FLOAT,
    INTEGER
} from "sequelize";
import { telemedDB } from "../databases/telemed";

export class HealthHartRate extends Model {
    avgVal!: number;
    date!: Date;
    device!: string;
    userId!: number;
}

HealthHartRate.init({
    userId: INTEGER,
    date: DATE,
    device: STRING,
    avgVal: FLOAT,
}, {
    sequelize: telemedDB,
    tableName: "health_hart_rates"
});
