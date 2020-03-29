import {
    Model,
    DATE,
    STRING,
    INTEGER,
} from "sequelize";
import { telemedDB } from "../databases/telemed";

export class Indicator extends Model {
    id!: number;
    createdAt!: Date;
    updatedAt!: Date;
    userId!: number | null;
    key!: string;
    value!: string;
    expiredAt!: Date | null;

    toJSON() {
        const result: any = this.get();

        return result;
    }
}

Indicator.init({
    userId: INTEGER,
    key: STRING,
    value: STRING,
    expiredAt: DATE,
}, {
    sequelize: telemedDB,
    tableName: "indicators",
});
