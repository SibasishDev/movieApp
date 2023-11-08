import mongoose, {Schema, Model, Document} from "mongoose";

interface IMovie extends Document {
    title : string,
    genre : string,
    streamingLink : string,
    rating : number,
    createdAt : string,
}

const movieSchema = new Schema<IMovie>({
    title : {
        type : String,
        required : true,
        unique : true,
    },
    genre : {
        type : String,
        required : true,
    },
    streamingLink : {
        type : String,
        required : true,
    },
    rating : {
        type : Number,
        required : true,
    },
    createdAt : {
        type : String,
        default : Date.now(),
    }
});

movieSchema.index({title : 1, genre : 1});

export const Movie : Model<IMovie> = mongoose.model<IMovie>("Movies", movieSchema);