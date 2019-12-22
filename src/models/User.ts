import {
    Model,
    DATE,
    STRING,
    FLOAT
} from "sequelize";
import { createHmac } from "crypto";
import { telemedDB } from "../databases/telemed";

const salt = "T8)Vm4NvV:5{M9&[[$3#[qd7E5?.]m!P2->vJC#>,84/bB]tRB}c]0w*?^nmm&D";

function getSecureKey(password: string) {
    return createHmac("sha1", salt).update(password).digest("base64");
}

export class User extends Model {
    id!: number;
    email!: string;
    secureKey!: string;

    setPassword(password: string) {
        this.secureKey = getSecureKey(password);

        return this;
    }

    validatePassword(password: string): boolean {
        return getSecureKey(password) === this.secureKey;
    }
}

User.init({
    email: STRING,
    secureKey: STRING,
}, {
    sequelize: telemedDB,
    tableName: "users"
});
