import * as Joi from 'joi';
import '@hapi/joi';

class MovieValidation {

     createSchema(data : any) {
        const schema = Joi.object({
            title :Joi.string().min(3).max(50).required(),
            genre : Joi.string().required(),
            rating : Joi.number().required(),
            streamingLink : Joi.string().required(),
        })

        return schema.validate(data);
    }

    updateSchema(data : any) {
        const schema = Joi.object({
            movieId : Joi.string().required(),
            title : Joi.string().allow(''),
            genre : Joi.string().allow(''),
            streamingLink : Joi.string().allow(''),
        }).xor('title', 'genre', 'streamingLink');

        return schema.validate(data);
    }
}

export const movieValidation = new MovieValidation();