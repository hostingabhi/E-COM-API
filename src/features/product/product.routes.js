//Manage routes/path to ProductController
//1. Import express
import express from 'express';
import ProductController from './product.controller.js';
import {upload} from "../../middlewares/fileupload.middleware.js"

//2. Initialize Express router
const ProductRouter = express.Router();
const productController = new ProductController();

//All the paths to controller methods
//localhost/api/products
ProductRouter.post("/rate",(req,res,next)=>{productController.rateProduct(req,res, next)});
ProductRouter.get("/filter",(req,res)=>{productController.filterProduct(req,res)})
ProductRouter.get("/",(req,res)=>{productController.getAllProducts(req,res)});
ProductRouter.post("/",upload.single('imageUrl'),(req,res)=>{
    productController.addProduct(req,res)
});
ProductRouter.get("/averagePrice",(req,res,next)=>{productController.averagePrice(req,res)});
ProductRouter.get("/:id",(req,res)=>{productController.getOneProduct(req,res)});


export default ProductRouter;