
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import { config } from "./config/config";
import { router } from "./router/main.router";
import { mongoDB } from "./config/mongodb.connection";
import { errorHandler } from "./middleware/response";


class App {

    app : any;
    port : number;
    constructor () {
        this.app = express();
        this.port = config.PORT;
    }

    init(){
        this.addMiddlewareRoutes(this.app);
        this.listenPort(this.app,this.port);
        this.mongoDBConnect();
    }

    addMiddlewareRoutes(app : any) {
        app.use(express.json({limit : "50mb"}),express.urlencoded({extended : true}));
        app.use(morgan("dev"));
        app.use(cors());
        app.use(helmet());

        app.use("/api", new router().getRouters());
        app.use(errorHandler);

    }

    mongoDBConnect(){
        mongoDB.connect();
    }

    listenPort(app : any ,port : number) {
        app.listen(port, () => {
            console.log(`Server id listening to port : ${port}`);
        });
    }
}

export  const app = new App();