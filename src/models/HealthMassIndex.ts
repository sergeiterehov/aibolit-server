import {
    Model,
    DATE,
    STRING,
    FLOAT,
    INTEGER
} from "sequelize";
import { telemedDB } from "../databases/telemed";

export class HealthMassIndex extends Model {
    val!: number;
    date!: Date;
    device!: string;
    userId!: number;
}

HealthMassIndex.init({
    userId: INTEGER,
    date: DATE,
    device: STRING,
    val: FLOAT,
}, {
    sequelize: telemedDB,
    tableName: "health_mass_indexes"
});
