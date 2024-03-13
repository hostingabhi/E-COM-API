import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Products'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    rating:Number
})