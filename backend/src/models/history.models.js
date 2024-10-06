import { Schema, model } from "mongoose";

const historySchema = new Schema({
    user1:{
        type: String,
        required: true
    },
    user2:{
        type: String,
        required: true
    },
    winner:{
        type: String
    }
}, {timestamps:true});


export const History = model("History", historySchema);