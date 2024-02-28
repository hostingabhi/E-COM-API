import { ApplicationError } from "../../error-handler/applicationError.js";
import ProductRepository from "./product-repository.js";
import ProductModel from "./product.model.js";


export default class ProductController{
    

    constructor(){
        this.productRepository = new ProductRepository();
    }

    async getAllProducts(req,res) {
        try{
          const products = await this.productRepository.getAll();
            res.status(200).send(products);
        }catch(err){
        console.log(err);
        return res.status(400).send("Something went wrong");
       }    
    }

    async addProduct(req,res){
       try{ 
        const {name,desc, price,sizes, category} = req.body;
        const newProduct = new ProductModel (
            name,
            desc,
            parseFloat(price),
            req.file.filename,
            category,
            sizes.split(',')
        )
        const createdProduct = await this.productRepository.add(newProduct);
        res.status(201).send(createdProduct)
    }catch(err){
        console.log(err);
    throw new ApplicationError("Something Went Wrong",500)
    } 
    }


    async getOneProduct(req,res){
        try{
            const id = req.params.id;
            const product = await this.productRepository.get(id);
            if(!product){
                res.status(404).send('Product not found');
            }else{
                return res.status(200).send(product);
            }
        
        }catch(err){
            console.log(err);
        throw new ApplicationError("Something Went Wrong",500)
        }


    }
    
    async filterProduct(req, res,next){
        try{
        
            const minPrice = req.query.minPrice;
            const maxPrice = req.query.maxPrice;
            const category = req.query.category;
            const result = await this.productRepository.filter(
                minPrice,
                // maxPrice,
                category
            );
            res.status(200).send(result);
        }catch(err){
            console.log(err);
        throw new ApplicationError("Something Went Wrong",500)
        }
    }
    async averagePrice(req,res,next){
        try{
            const result = await this.productRepository.averageProductPricePerCategory()
            res.status(200).send(result);
            
        }catch(err){
            console.log(err);
        throw new ApplicationError("Something Went Wrong",500)
        }
    }
    async rateProduct(req,res,next){
        try{
        const userID = req.userID;
        const productID = req.body.productID;
        const rating = req.body.rating;
        try{
            await this.productRepository.rate(userID,productID,rating);
        }catch(err){
            return res.status(400).send(err.message);
        }
        return res.status(200).send("Rating has been added");
    }catch(err){
        console.log(err)
        console.log("Passing error to middleware");
        next(err);
    }
    }
}