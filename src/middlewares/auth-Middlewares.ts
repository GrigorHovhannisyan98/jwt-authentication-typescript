import {Request,Response,NextFunction} from "express";
import {apiErrors} from "../apiError/errors";
import {tokenService} from "../services/token.serv";


export class Auth{

   static authorization(req:Request,res:Response,next:NextFunction){
        try {
            const headers:string=req.headers.authorization

            const accssesToken:string=headers.split(" ")[1];

            if(!accssesToken){
                throw apiErrors.UnauthError("unauth error")
            }
          const userData= tokenService.validateAccessToken(accssesToken)

            if (!userData){
                throw apiErrors.UnauthError("unauth error")
            }
                next()
        }catch (e) {
            return next(apiErrors.UnauthError("unauth error"))
            
        }

}
}