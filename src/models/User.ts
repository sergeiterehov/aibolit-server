import {
    Model,
    DATE,
    STRING,
    FLOAT
} from "sequelize";
import { telemedDB } from "../databases/telemed";

export class User extends Model {
    email!: string;
}

User.init({
    email: STRING,
}, {
    sequelize: telemedDB,
    tableName: "users"
});
