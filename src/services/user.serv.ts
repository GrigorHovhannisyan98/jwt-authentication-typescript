import {User} from "../models/user.model";
import bcrypt from 'bcrypt'
import {tokenService} from "./token.serv";
import {Iuser} from "../types/infoControll";
import * as crypto from "crypto";
import {UserDto} from "../UserDto/dataTransferObject";
import {apiErrors} from "../apiError/errors";
import {Mailer} from "./nodemailer";
import {Generator} from "./password.serv";

const mailer = new Mailer(process.env.SMTP_HOST, 465, process.env.SMTP_USER, process.env.SMTP_PASSWORD)

export class userService {
    private readonly email: string;
    private readonly password: string;
    private readonly lastname: string;
    private readonly firstname: string;
    private readonly role: string

    constructor(request?: Iuser) {
        this.email = request.email;
        this.password = request.password;
        this.lastname = request.lastname
        this.firstname = request.firstname
        this.role = request.role
    }

    async registr() {
        const futureUser = await User.findOne({where: {email: this.email}})
        if (futureUser) {
            throw  apiErrors.BadRequest(`${this.email} already used`)
        }
        const id: string = crypto.randomUUID()
        const hashPassword: string = await bcrypt.hash(this.password, 3)
        const user = await User.create(
            {
                id: id, lastname: this.lastname,
                firstname: this.firstname,
                email: this.email,
                role: this.role,
                password: hashPassword
            })


        await mailer.sendActivationLink(this.email, id)
        const userdto = new UserDto(user)
        const tokens = await tokenService.createToken(userdto.getUserInfo)
        await tokenService.saveToken(userdto.getUserInfo.id, tokens.refreshtoken)
        return {token: tokens, user: userdto.getUserInfo}

    };

    async login() {
        const findUser = await User.findOne({where: {email: this.email}})
        if (!findUser) {
            throw apiErrors.BadRequest("No user with this email address")
        }
        const userdto = new UserDto(findUser)
        const findPass = await bcrypt.compare(this.password, userdto.getUserPass)

        if (!findPass) {
            throw apiErrors.BadRequest("invalid password")
        }

        const tokens = await tokenService.createToken(userdto.getUserInfo)
        await tokenService.saveToken(userdto.getUserInfo.id, tokens.refreshtoken)
        return {token: tokens, user: userdto.getUserInfo}

    };

    static async logout(refreshToken: string) {

        return await tokenService.deletToken(refreshToken)
    };

    static async activate(activationKey: string) {
        const user = await User.findOne({where: {id: activationKey}})

        if (!user) {
            throw apiErrors.BadRequest("invalid activation linc");
        }


        await User.update({isActive: true}, {where: {id: activationKey}})
    };

    static async refreshDbToken(refreshtoken: string) {
        if (!refreshtoken) {
            throw apiErrors.UnauthError("Unauthorized")
        }
        const userData = await tokenService.validateRefreshToken(refreshtoken)
        const tokenDb = await tokenService.getDbToken(refreshtoken)

        if (!userData || !tokenDb) {
            throw apiErrors.UnauthError("Unauthorized")
        }
        const user = await User.findOne({where: {id: userData.id}})
        const userdto = new UserDto(user)
        const tokens = await tokenService.createToken(userdto.getUserInfo)
        await tokenService.saveToken(userdto.getUserInfo.id, tokens.refreshtoken)
        return {token: tokens, user: userdto.getUserInfo}


    };

    static async findUsers() {
        const users = User.findAll();
        return users
    };

    static async forgotPassword(email: string) {

        try {
            const user = await User.findOne({where: {email: email}})

            if (!user) {
                throw apiErrors.BadRequest("there is no user with this email address")
            }
            const userdto = new UserDto(user)
            const newPassword = await Generator.generatePassword(12)
            await Generator.newPassDB(newPassword, userdto.getUserInfo.id)
            await mailer.sendNewpassword(email, newPassword)
        } catch (e) {
            throw apiErrors.BadRequest("error")
        }


    }


}

