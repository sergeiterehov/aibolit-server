import {
    Model,
    DATE,
    STRING,
    FLOAT
} from "sequelize";
import { telemedDB } from "../databases/telemed";

export class User extends Model {
    id!: number;
    email!: string;
}

User.init({
    email: STRING,
}, {
    sequelize: telemedDB,
    tableName: "users"
});
