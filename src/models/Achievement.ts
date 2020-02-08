import {
    Model,
    DATE,
    STRING,
    FLOAT,
    INTEGER
} from "sequelize";
import { telemedDB } from "../databases/telemed";

export class Achievement extends Model {
    id!: number;
    key!: number;
}

Achievement.init({
    key: STRING,
}, {
    sequelize: telemedDB,
    tableName: "achievements"
});
