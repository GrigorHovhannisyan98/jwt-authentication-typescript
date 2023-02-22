import jwt from 'jsonwebtoken'
import {Ipayload} from "../types/infoControll";
import {Token} from "../models/token.model";
import * as dotenv from 'dotenv'


dotenv.config({path: './src/.env'})

export class tokenService {


    static async createToken(payload: Ipayload) {

        const accsesstoken: string = jwt.sign(payload, process.env.JWT_SECACCESS, {expiresIn: "15m"})
        const refreshtoken: string = jwt.sign(payload, process.env.JWT_SECREFRESH, {expiresIn: "30d"})
        return {
            accsesstoken,
            refreshtoken
        }

    }

    static async saveToken(id: string, refreshtoken: string) {
        const tokenData = await Token.findOne({where: {UserId: id}})
        if (tokenData) {
            await Token.update({refreshToken: refreshtoken}, {where: {UserId: id}});
        } else {
            return Token.create({refreshToken: refreshtoken, UserId: id})
        }
    };

    static async deletToken(refreshToken: string) {
        return await Token.destroy({where: {refreshToken: refreshToken}})
    };

    static async validateRefreshToken(token: string) {
        try {
            const userData: any = jwt.verify(token, process.env.JWT_SECREFRESH)

            return userData
        } catch (e) {
            return null
        }

    };

    static validateAccessToken(token: string) {
        try {
            const userData: any = jwt.verify(token, process.env.JWT_SECACCESS)

            return userData
        } catch (e) {
            return null
        }

    };

    static async getDbToken(refreshToken: string) {
        return await Token.findOne({where: {refreshToken: refreshToken}})


    }


}

