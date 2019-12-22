import {
    Model,
    DATE,
    STRING,
    FLOAT,
    INTEGER,
    TEXT
} from "sequelize";
import { telemedDB } from "../databases/telemed";
import { AttachmentType } from "../enums/AttachmentType";

export class MessageAttachment extends Model {
    id!: number;
    messageId!: number;
    type!: AttachmentType;
    resource!: string;
    resourceId!: number;
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
    resourceId: INTEGER,
}, {
    sequelize: telemedDB,
    tableName: "message_attachments"
});
