import {Router} from "express";
import { movieController } from "../controller/movie/movie.controller";

class UserRouter {

    router : any;

    constructor () {
        this.router = Router();
        this.init();
    }

    init(){
        this.router.post("/create-movie", movieController.createMovie);
        this.router.get("/get-all-movie", movieController.getAllMovie);
        this.router.put("/update-movie" , movieController.updateMovieById);
        this.router.get("/search-movie", movieController.searchMovie);
        this.router.delete("/delete-movie", movieController.deleteMovie);
    }

    getRouters(){
        return this.router;
    }
}

export const userRouter = UserRouter;