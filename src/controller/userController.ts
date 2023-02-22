import {Request, Response, NextFunction} from "express";
import {userService} from "../services/user.serv";
import {validationResult} from "express-validator";
import {apiErrors} from "../apiError/errors";


export class Controller {

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors: any = validationResult(req);
            if (!errors.isEmpty()) {
                return next(apiErrors.BadRequest("validation error", errors.array()))
            };
            const userservice= new userService(req.body);
            const userData = await userservice.registr();
            res.cookie("refreshToken", userData.token.refreshtoken, {maxAge: 1728000 * 1000, httpOnly: true});
            res.status(200).send(userData);

        } catch (e) {
            next(e)
        }
    };

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const userservice = new userService(req.body);
            const userData = await userservice.login();
            res.cookie("refreshToken", userData.token.refreshtoken, {maxAge: 1728000* 1000, httpOnly: true});
            res.status(200).send(userData);
        } catch (e) {
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshtoken = req.headers.cookie.split("=")[1];
            const token = await userService.logout(refreshtoken);
            res.clearCookie("refreshToken");
            res.json({token})

        } catch (e) {
            next(e)
        }
    };

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
        await userService.activate(req.params.key);
           res.status(200).json({messsage: "ok"})

        } catch (e) {
            next(e)
        }
    };

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshtoken = req.headers.cookie.split("=")[1];

            const userData = await userService.refreshDbToken(refreshtoken);
            res.cookie("refreshToken", userData.token.refreshtoken, {maxAge: 1728000* 1000, httpOnly: true});
            res.status(200).json({message:"refresh"})
        } catch (e) {
            next(e)
        }
    };

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users=await userService.findUsers();
               res.json(users)
        } catch (e) {
            next(e)
        }
    };

    async resetPassword(req:Request,res:Response,next:NextFunction){
        try {

          await  userService.forgotPassword(req.body.email);
            res.status(200).json({message:"new password genereted"})
        }catch (e) {
           next(e)
        }
    };





}


