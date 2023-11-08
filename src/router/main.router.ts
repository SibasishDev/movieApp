import {Router,Request,Response,NextFunction} from "express";
import { authController } from "../controller/auth/auth.controller";
import { verifyAccessToken } from "../middleware/auth.middleware";
import { userRouter } from "./user.router";

class MainRouter {

    router : any;

    constructor () {
        this.router = Router();
        this.init();
    }

    init(){
        this.router.post("/auth/login", authController.login);
        this.router.post("/auth/register", authController.register);

        this.router.use(verifyAccessToken);

        this.router.use("/movie",  new userRouter().getRouters());

        this.router.use("*", (req: Request, res: Response, next: NextFunction) => {
            return res.status(404).json({
                code : 404,
                message : "Not found"
            })
        })

    }

    getRouters(){
        return this.router;
    }
}

export const router = MainRouter;