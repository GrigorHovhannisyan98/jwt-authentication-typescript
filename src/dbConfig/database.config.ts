import {Sequelize} from "sequelize";
import * as dotenv from 'dotenv'
dotenv.config({ path: './src/.env' })
const db = new Sequelize(process.env.DB, process.env.DB_USERNAME, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})


export default db;
