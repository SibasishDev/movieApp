import {Request,Response,NextFunction } from "express";
import { authValidation } from "./auth.validation";
import { User } from "../../modal/user.modal";
import { bcryptService } from "../../services/bcrypt.services";
import { jwtService } from "../../services/jwt.services";
import { successResponse } from "../../middleware/response";


class AuthController {

    login = async (req : Request, res : Response, next : NextFunction) : Promise<any> => {
        try{
            const {error, value} = await authValidation.loginSchema(req.body);

            if(error) return next({code : 400, message : error.message});

            const checkUserExist = await User.findOne({"email" : value.email}, {_id : 1, email : 1, role : 1,password  : 1});

            if(!checkUserExist) return next({code : 400, message : "Invalid email, user doest not exist"});

            const isMatch : any = await bcryptService.decryptPassword(value.password,checkUserExist.password);

            if(!isMatch) return next({code : 400, message : "Incorrect password"});

            const token = await jwtService.createToken(checkUserExist._id,checkUserExist.email,checkUserExist.role);

            if(!token) return next({code : 400, message : "Something went wrong"});

            const data = {
                id : checkUserExist._id,
                email : checkUserExist.email,
                // role : checkUserExist.role,
                token
            };

            return successResponse(res,200,"Login sucessfull",data);

        }catch(e : any){
            next({code : 400, message : e.message});
        }
    }

    register = async (req : Request, res : Response, next : NextFunction) : Promise<any> => {
        try{
            const {error, value} =  authValidation.registerSchema(req.body);

            if(error) return next({code : 400, message : error.message});

            value.password = await bcryptService.encryptPassword(value.password);
            
            delete value.repeatPassword;

            const createUser = await User.create(value);

            if(!createUser) return next({code : 400, message : "Something went worng"});

            const responseData :any = createUser.toJSON();

            delete responseData.paaword;

            return successResponse(res,201,"User created",responseData);

        }catch(e : any){
            console.log(e);
            next({code : 400, message : e.message});
        }
    }
}

export const authController = new AuthController();