import CartItemModel from "./cartitems.model.js";

export class CartItemController{
    add(req,res){
         const {productID, quantity} = req.query;
         const userID = req.userID;
        CartItemModel.add(productID, userID, quantity);
        res.status(201).send("Cart is updated");
    }

    get(req, res){
        const userID = req.userID;
        const items = CartItemModel.get(userID)
        return res.status(200).send(items);
    }

    delete(req,res){
        const userID = req.userID;
        const cartIeamID = req.params.id;
        const error = CartItemModel.delete(cartIeamID, userID);  
        if(error){
            return res.status(404).send(error);
        }
        return res.status(200).send('Cart iteam is removed');
    }
}