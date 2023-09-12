import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const User = db.define("user", 
    {
        nama: DataTypes.STRING,
    email: DataTypes.STRING,
        password: DataTypes.STRING,
        usia: DataTypes.INTEGER,
    },
    {
        freezeTableName:true
    }
);

export default User;

(async () => {
    await db.sync();
})();