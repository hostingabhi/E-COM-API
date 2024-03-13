import mongoose from "mongoose";
import dotenv from "dotenv";
import { categorySchema } from "../features/product/category-schema.js";

dotenv.config();

export const connectUsingMongoose = async() =>{
    try{

        await mongoose.connect(process.env.DB_URL,{
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log("MongoDB connect using mongoose");
        addCategories();
    }catch(err){
        console.log("Error while connecting the DB");
        console.log(err);
    }

}

async function addCategories(){
    const CategoryModel = mongoose.model("Category", categorySchema);
    const categories = CategoryModel.find();
    if(!categories || (await categories).length == 0){
        await CategoryModel.insertMany([{name:'Books'},{name:'Clothing'},{name:'Electronics'}])
    }
    console.log("Categories added")
}