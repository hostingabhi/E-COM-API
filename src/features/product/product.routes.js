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
ProductRouter.post("/rate",productController.rateProduct);
ProductRouter.get("/filter",productController.filterProduct)
ProductRouter.get("/",productController.getAllProducts);
ProductRouter.post("/",upload.single('imageUrl'),productController.addProduct);
ProductRouter.get("/:id",productController.getOneProduct);


export default ProductRouter;