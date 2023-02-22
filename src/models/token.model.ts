import {DataTypes, Model} from "sequelize";
import {Itoken} from "../types/infoControll";
import db from "../dbConfig/database.config";
import {User} from "./user.model";

export class Token extends Model<Itoken> {
}

Token.init({

    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    UserId: {
        primaryKey: true,
        type: DataTypes.UUID,
        references: {
            model: User,
            key: "id"
        },
    }

}, {
    sequelize: db,
    tableName: 'Token',

})





