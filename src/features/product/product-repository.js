import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import mongoose from "mongoose";
import { productSchema } from "./product-schema.js";
import { reviewSchema } from "./review-schema.js";
import { categorySchema } from "./category-schema.js";

const ProductModel = mongoose.model("Products", productSchema);
const ReviewModel = mongoose.model("Review", reviewSchema);
const CategoryModel = mongoose.model('Category',categorySchema);

class ProductRepository {
    constructor() {
        this.collection = "products"
    }
    async getAll() {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const products = await collection.find().toArray();
            return products;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async add(productData) {
        try {
            //1. get the DB.
            //const db = getDB();
            //const collection = db.collection(this.collection);
            //await collection.insertOne(newProduct);
            //return newProduct;
            //1. add product
            productData.categories=productData.category.split(',');
            const newProduct = new ProductModel(productData);
            const savedProduct = await newProduct.save();

            // 2. Update categories.
            await CategoryModel.updateMany(
                {_id: {$in: productData.categories}},
                {$push: {products: new ObjectId(savedProduct._id)}}
            )
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }

    async get(id) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({ _id: new ObjectId(id) });
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something Went Wrong", 500)
        }
    }
    //Product should have min price specifies and category
    async filter(
        minPrice,
        // maxPrice, 
        category) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            let filterExpression = {};
            if (minPrice) {
                filterExpression.price = { $gte: parseFloat(minPrice) }
            }
            // if(maxPrice){
            //     filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)}
            // }
            if (category) {
                filterExpression = { $or: [{ category: category }, filterExpression] }
                // filterExpression.category = category
            }
            return collection.find(filterExpression).
                // project({name:1,price:1,_id:0, ratings:{$slice:3}}).
                toArray(); //project is use to define which field you want to visible in reply or not
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something Went Wrong", 500)
        }
    }

    // async rate(userID, productID, rating){
    //     try{
    //         const db = getDB();
    //         const collection = db.collection(this.collection);
    //         //1. Find the Product
    //         const product = await collection.findOne({_id:new ObjectId(productID)});
    //         //2. Find the rating
    //         const userRating = product?.ratings?.find(r=>r.userID==userID);
    //         if(userRating){
    //             //update the rating
    //             await collection.updateOne({
    //                 _id:new ObjectId(productID),"ratings.userID": new ObjectId(userID)
    //             },{
    //                 $set:{"ratings.$.rating":rating}
    //             })

    //         }else{

    //             await collection.updateOne({
    //                 _id: new ObjectId(productID)
    //             },{
    //                 $push:{ratings:{userID:new ObjectId(userID),rating}}
    //             })
    //         }

    //     }catch(err){
    //         console.log(err);
    //     throw new ApplicationError("Something Went Wrong",500)
    //     }
    // }

    //Creating this to face the race problem(race problem is when same user performing same action from diffrent device so we catch the user to avoid data intruption)
    async rate(userID, productID, rating) {
        try {
            // older code
            // const db = getDB();
            // const collection = db.collection(this.collection);
            // //1. remove exisitng entry
            // await collection.updateOne({
            //     _id:new ObjectId(productID)
            // },{
            //     $pull:{ratings:{userID: new ObjectId(userID)}}
            // })
            // //2. Add new entry
            // await collection.updateOne({
            //     _id: new ObjectId(productID)
            // },{
            //     $push:{ratings:{userID:new ObjectId(userID),rating}}
            // })

            //new code
            //1. Check if product exists
            const productToUpdate = await ProductModel.findById(productID);
            if (!productToUpdate) {
                throw new Error("Product not not found")
            }
            //Find the existing review
            const userReview = await ReviewModel.findOne({ product: new ObjectId(productID), user: new ObjectId(userID) });
            if (userReview) {
                userReview.rating = rating;
                await userReview.save();
            } else {
                const newReview = new ReviewModel({
                    product: new ObjectId(productID),
                    user: new ObjectId(userID),
                    ratings: rating
                })
                newReview.save();
            }

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something Went Wrong", 500)
        }
    }

    async averageProductPricePerCategory() {
        try {
            const db = getDB();
            return await db.collection(this.collection).aggregate([
                {
                    //stage 1: Get Average Price per Category
                    $group: {
                        _id: "$category",
                        averagePrice: { $avg: "$price" }
                    }
                }
            ]).toArray();
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something Went Wrong", 500)
        }

    }
}

export default ProductRepository;