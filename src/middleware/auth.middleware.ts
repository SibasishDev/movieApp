import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwt.services";

interface CustomRequest extends Request {
    user : any;
}


export const verifyAccessToken = async (req : CustomRequest, res : Response, next : NextFunction) : Promise<any> => {
    try{

        let tokenFormReq = req.body.token || req.query.token || req.headers["x-access-token"];
        if(req.headers["authorization"]) {
            const authHeader = req.headers["authorization"];
            if(!authHeader) return next({code : 401, message : "Access denied token requird"});

            tokenFormReq = authHeader.split(" ")[1];
        }

        if(tokenFormReq == null) return next({code : 401, message : "Access denied"});

        const payload : any = await jwtService.verifyToken(tokenFormReq);

        if(!payload) return next({code : 400, message : "Token is expired"});

        delete payload.iat;
        delete payload.exp;

        req.user = payload;

        next();

    }catch(e){
        next(e);
    }
}