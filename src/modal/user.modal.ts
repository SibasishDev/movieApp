import mongoose, { Model, Schema, Document } from "mongoose";


interface IUser extends Document {
    email : string,
    name : string,
    role : number,
    password : string,
    createdAt : string
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        requird: true,
    },
    role : {
        type : Number,
        enum : [1,2],
        description : "1 : admin, 2 : user",
    },
    password : {
        type : String,
        required : true,
    },
    createdAt : {
        type : String,
        default : Date.now(),
    }

});

export const User : Model<IUser> = mongoose.model<IUser>("User",userSchema);