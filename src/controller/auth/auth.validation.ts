import Joi from "joi";

class AuthValidation {

     registerSchema(data : any) {
        const schema = Joi.object({
            email :Joi.string().min(3).required().email(),
            name : Joi.string().required(),
            role : Joi.number().required(),
            password : Joi.string().min(3).max(10).required(),
            repeatPassword : Joi.ref("password")
        })

        return schema.validate(data);
    }

    loginSchema(data : any) {
        const schema = Joi.object({
            email : Joi.string().min(3).required().email(),
            password : Joi.string().min(3).required(),
        });

        return schema.validate(data);
    }
}

export const authValidation = new AuthValidation();