import CartIteamsReposiotry from "./cartitems-repository.js";
import CartItemModel from "./cartitems.model.js";

export class CartItemController{

    constructor(){
        this.cartItemsRepository = new CartIteamsReposiotry();
    }
    async add(req,res){
        try{
        
            const {productID, quantity} = req.body;
            const userID = req.userID;
            await this.cartItemsRepository.add(productID, userID, quantity);
            res.status(201).send("Cart is updated");
        }catch(err){
          console.log(err);
            return res.status(500).send("Something went wrong with Database");
        }
    }

    async get(req, res){
        try{
            const userID = req.userID;
            console.log(userID);
            const items = await this.cartItemsRepository.get(userID)
            return res.status(200).send(items);
        }catch(err){
          console.log(err);
            return res.status(500).send("Something went wrong with Database");
        }
    }

    async delete(req,res){
        try{
        const userID = req.userID;
        const cartIeamID = req.params.id;
        const isDeleted = await this.cartItemsRepository.delete(userID,cartIeamID,);
        if(!isDeleted){
            return res.status(404).send("Iteam not found");
        }
        return res.status(200).send('Cart iteam is removed');
        
        }catch(err){
          console.log(err);
            return res.status(500).send("Something went wrong with Database");
        }
    }
    
}