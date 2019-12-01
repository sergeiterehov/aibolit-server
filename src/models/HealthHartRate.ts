import {
    Model,
    Sequelize,
    DATE,
    STRING,
    FLOAT
} from "sequelize";
import configs from "../../config/config.json";

const sequelize = new Sequelize(configs[process.env.NODE_ENV || "development"]);

export class HealthHartRate extends Model {
    avgVal!: number;
    date!: Date;
    device!: string;
}

HealthHartRate.init({
    date: DATE,
    device: STRING,
    avgVal: FLOAT,
}, {
    sequelize,
    tableName: "health_hart_rate"
});
