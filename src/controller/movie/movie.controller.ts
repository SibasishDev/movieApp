import { Request, Response,NextFunction } from "express";
import { movieValidation } from "./movie.validation";
import { Movie } from "../../modal/movie.modal";
import { successResponse } from "../../middleware/response";

interface CustomRequest extends Request {
    user : any;
}


class MovieController {

    createMovie = async (req: CustomRequest, res : Response, next : NextFunction) : Promise<any> => {
        try{

            const {error , value} = movieValidation.createSchema(req.body);

            if(error) return next({code : 400, message : error.message});

            if(req.user.role != 1) return next({code : 400, message : "You are not authorized to create movie"});

            const createMovie = await Movie.create(value);

            if(!createMovie) return next({code : 400, message : "Something went wrong"});

            return successResponse(res,201,"Movie created",createMovie);


            

        }catch(e : any){
            next({code : 400, message : e.message});
        }
    }

    getAllMovie = async (req :Request, res : Response, next :NextFunction) : Promise<any> => {
        try{

            const searchResult = await Movie.find({});

            if(!searchResult.length) return next({code : 400, message : "No movies found"});

            return successResponse(res, 200, "Movie fetch successfully", searchResult);

        }catch(e){
            next(e);
        }
    }

    updateMovieById = async (req :Request, res :Response, next :NextFunction) : Promise<any> => {
        try{
            const {error, value} = movieValidation.updateSchema(req.body);
            
            if(error) return next({code : 400, message : error.message});

            const checkMovie = await Movie.findOne({_id : value.movieId},{_id : 1});

            if(!checkMovie) return next({code : 400, message : "Movie not found"});

            const data : any = {};

            if(value.title) data.title = value.title;

            if(value.genre) data.genre = value.genre;

            if(value.rating) data.rating = value.rating;

            if(value.streamingLink) data.streamingLink = value.streamingLink;


            const updateMovie = await Movie.findByIdAndUpdate(value.movieId,data,{new : true});

            if(!updateMovie) return next({code : 400, message : "Something went wrong"});


            return successResponse(res,200,"Movie updated",updateMovie);


        }catch(e){
            next(e);
        }
    }

    searchMovie = async (req: Request, res : Response, next : NextFunction) : Promise<any> => {
        try{

            const {title , genre} = req.query as Partial<any>;

            if(!title && !genre) return next({code : 400, message : "Tile or Genre requird"});

            const searchCondition : any = [];

            if(title) searchCondition.push({title : {$regex : title, $options : "i"}});

            if(genre) searchCondition.push({genre : {$regex : genre, $options : "i"}});

            const searchResult = await Movie.find({
                $or : searchCondition,
            });

            if(!searchResult.length) return next({code : 400, message : "Movie not found"});

            return successResponse(res, 200, "Movie fetch successfully",searchResult);

        }catch(e){
            next(e);
        }
    }

    deleteMovie = async (req : CustomRequest, res : Response, next : NextFunction) : Promise<any> => {
        try{
            const {movieId} = req.body as Partial<any>;

            if(!movieId) return next({code : 400, message : "movieId required"});

            if(req.user.role != 1) return next({code : 400, message : "You are not authorized to delete movie"});

            const checkMovieExist = await Movie.findById(movieId);

            if(!checkMovieExist) return next({code : 400, message : "Movie does not exist"});

            const deleteMovie =  await Movie.deleteOne({_id : movieId});

            if(deleteMovie.deletedCount === 0) return next({code : 400 , message : "Something went wrong"});

            return successResponse(res, 200, "Movie deleted successfully");

        }catch(e){
            next(e);
        }
    }
}

export const movieController = new MovieController();