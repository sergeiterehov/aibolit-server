import {
    Model,
    DATE,
    STRING,
    FLOAT,
    INTEGER
} from "sequelize";
import { telemedDB } from "../databases/telemed";

export class UserToken extends Model {
    id!: number;
    userId!: number;
    token!: string;
}

UserToken.init({
    userId: INTEGER,
    token: STRING,
}, {
    sequelize: telemedDB,
    tableName: "user_tokens"
});
