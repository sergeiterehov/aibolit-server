import {
    Model,
    Sequelize,
    DATE,
    STRING,
    FLOAT
} from "sequelize";

const sequelize = new Sequelize("mysql://root:password@localhost:3306/telemed");

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
