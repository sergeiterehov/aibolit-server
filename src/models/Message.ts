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
    createdAt!: Date;

    toJSON() {
        const result: any = this.get();

        delete result.updatedAt;

        return result;
    }
}

Message.init({
    fromUserId: INTEGER,
    toUserId: INTEGER,
    text: TEXT,
}, {
    sequelize: telemedDB,
    tableName: "messages",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
});
