//Manage routes/path to ProductController
//1. Import express
import express from 'express';
import { CartItemController } from './cartitems.controller.js';
//2. Initialize Express router
const cartRouter = express.Router();

const cartController = new CartItemController();

cartRouter.delete('/:id',cartController.delete);
cartRouter.post('/', cartController.add);
cartRouter.get('/',cartController.get);

export default cartRouter;