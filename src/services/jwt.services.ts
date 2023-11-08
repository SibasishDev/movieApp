import jwt from "jsonwebtoken";
import { config } from "../config/config";

class JwtService {

    createToken = (id : string, email : string, role : number) => {
        return new Promise((resolve,reject) => {
            jwt.sign({
                id : id,
                email : email,
                role : role
            },config.JWT_SECRET_KEY, {expiresIn : 1 * 60 * 60}, (err,token) => {
                if(err) reject(false);
                resolve(token);
            })
        })
    }

    verifyToken = (token : string) => {
        return new Promise((resolve,reject) => {
            jwt.verify(token,config.JWT_SECRET_KEY, (err,decoded) => {
                if(err) reject(err);
                resolve(decoded);
            })
        })
    }
}

export const jwtService = new JwtService();