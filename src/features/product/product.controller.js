import ProductModel from "./product.model.js";


export default class ProductController{
    getAllProducts(req, res){
        const products = ProductModel.getAll();
        res.status(200).send(products);
    }

    addProduct(req,res){
        const {name,desc, price,sizes} = req.body;
        const newProduct = {
            name,
            desc,
            price:parseFloat(price),
            sizes:sizes.split(','),
            imageUrl: req.file.filename,
        };
        const createdRecord = ProductModel.add(newProduct);
        res.status(201).send(createdRecord)   
    }


    getOneProduct(req,res){
        const id = req.params.id;
        const product = ProductModel.get(id)
        if(!product){
            res.status(404).send('Product not found');
        }else{
            return res.status(200).send(product);
        }

    }
    
    filterProduct(req, res,next){
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const result = ProductModel.filter(
            minPrice,
            maxPrice,
            category
        );
        res.status(200).send(result);
    }

    rateProduct(req,res,next){
        try{
        const userID = req.query.userID;
        const productID = req.querys.productID;
        const rating = req.query.rating;
        try{
            ProductModel.rateProduct(userID,productID,rating);
        }catch(err){
            return res.status(400).send(err.message);
        }
        return res.status(200).send("Rating has been added");
    }catch(err){
        console.log("Passing error to middleware");
        next(err);
    }
    }
}