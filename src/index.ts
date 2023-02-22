import express, {Application} from "express";
import router from "./router/appRout";
import cookieParser from "cookie-parser";
import {sequel} from "./dbConfig/migratinon";
import * as dotenv from 'dotenv'
import {Apierror} from "./middlewares/ErrorMiddleware";

dotenv.config({path: './src/.env'})

const app: Application = express();
app.use(express.json())
app.use('/api', router)
app.use(cookieParser())
app.use(Apierror)
const startServer = async () => {
    try {
       await sequel()
        app.listen(process.env.PORT, () => {
            console.log(`server run port ${process.env.PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}
startServer()