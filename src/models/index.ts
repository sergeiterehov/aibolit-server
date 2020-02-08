import { User } from "./User";
import { UserToken } from "./UserToken";
import { Message } from "./Message";
import { MessageAttachment } from "./MessageAttachment";
import { UserAchievement } from "./UserAchievement";
import { Achievement } from "./Achievement";

User.hasMany(UserToken);
UserToken.belongsTo(User);

User.hasMany(UserAchievement);
UserAchievement.belongsTo(User);

Achievement.hasMany(UserAchievement);
UserAchievement.belongsTo(Achievement);

Message.hasMany(MessageAttachment);
MessageAttachment.belongsTo(Message);
