import { Sequelize } from "sequelize";
import configs from "../../config/config.json";

export const telemedDB = new Sequelize(configs[process.env.NODE_ENV || "development"]);
