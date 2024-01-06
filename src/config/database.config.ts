import { Sequelize } from "sequelize-typescript";
import Report from "../Models/Reports";
import Doctors from "../Models/Doctors";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite3',
    logging: false

}); 


export default sequelize;
