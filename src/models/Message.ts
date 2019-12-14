import {
    Model,
    DATE,
    STRING,
    FLOAT,
    INTEGER,
    TEXT
} from "sequelize";
import { telemedDB } from "../databases/telemed";

export class Message extends Model {
    id!: number;
    fromUserId!: number;
    toUserId!: number;
    text!: string;
}

Message.init({
    fromUserId: INTEGER,
    toUserId: INTEGER,
    text: TEXT,
}, {
    sequelize: telemedDB,
    tableName: "messages"
});
