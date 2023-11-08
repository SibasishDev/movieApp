import mongoose from "mongoose";
import { config } from "./config";

class MongoDB {

    async connect() {
        try{
        await mongoose.connect(config.MONGO_DB_URL,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true
        });

        console.log("Mongodb connected");

    }catch(e){
        console.log("Error in connecting mongodb");
        setTimeout( async () => {
            console.log("Retrying after connect");
            await this.connect();
        }, 1000);
    }
    }
}

export const mongoDB =new MongoDB();