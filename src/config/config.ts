import dotenv from "dotenv";
dotenv.config();

class Config {
    PORT : number;
    MONGO_DB_URL : string;
    JWT_SECRET_KEY : string;
    constructor () {
        this.PORT = +process.env.PORT! || 8088;
        this.MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://localhost:27017/movie";
        this.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "$%secret-key#$%";
    }
}

export const config = new Config();