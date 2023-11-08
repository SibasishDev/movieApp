import { Request, Response, NextFunction } from "express";

export const errorHandler = (error : any, req :Request, res : Response, next : NextFunction) => {
    console.log(error);
    return res.status(error.code || 500).json({
        code : error.code || 500,
        message : error.message || "Internal server error"
    })
}

export const successResponse = (res : Response, status : number, message : string, data : any = null) => {
    const responseData : any = {
        code : status,
        message : message
    };

    if(data) responseData.data = data;

    res.status(status).json(responseData);
}