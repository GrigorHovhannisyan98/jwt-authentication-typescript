import {apiErrors} from "../apiError/errors";
import {Request, Response, NextFunction} from "express";


export function Apierror(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err)
    if (err instanceof apiErrors) {
        res.status(err.status).send({message: err.message, errors: err.errors})
    }
    return res.status(500).send({message: "somthing is wrong"})
}