import { User } from "./User";
import { UserToken } from "./UserToken";
import { Message } from "./Message";
import { MessageAttachment } from "./MessageAttachment";

User.hasMany(UserToken);
UserToken.belongsTo(User);

Message.hasMany(MessageAttachment);
MessageAttachment.belongsTo(Message);
