import {
    Model,
    DATE,
    STRING,
    FLOAT,
    INTEGER,
    TEXT
} from "sequelize";
import { telemedDB } from "../databases/telemed";

export class MessageAttachment extends Model {
    id!: number;
    messageId!: number;
    type!: number;
    resource!: string;
}

MessageAttachment.init({
    messageId: {
        type: INTEGER,
        references: {
            model: "messages",
            key: "id",
        }
    },
    type: INTEGER,
    resource: TEXT,
}, {
    sequelize: telemedDB,
    tableName: "message_attachments"
});
