import {DataTypes, Model} from "sequelize";
import {Iuser} from "../types/infoControll";
import db from "../dbConfig/database.config";

export class User extends Model<Iuser> {
}

User.init({

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            defaultValue: 'user',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize: db,
        tableName: 'users'
    }
)
