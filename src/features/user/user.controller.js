import UserRepository from "./user-repository.js";
import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export default class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }
    async resetPassword(req,res,next){
        const {newPasword }= req.body;
        const hashedPassword = await bcrypt.hash(newPasword,12)
        const userID = req.userID;
        try{
            await this.userRepository.resetPassword(userID, hashedPassword)
            res.status(200).send("Password is updated");
        }catch(err){
          console.log(err);
            console.log("passing error to middleware");
            next(err);
        }
    }
    async signUp(req,res,next){
        const { name, email, password, type} = req.body;
        //create a hash from password
        const hashedPassword = await bcrypt.hash(password, 12)
        try{
        const user = new UserModel(
            name,
            email,
            hashedPassword,
            type);
        await this.userRepository.signUp(user);
        res.status(201).send(user);
        
        }catch(err){
          next(err);
            return res.status(500).send("Something went wrong with Database");
        }
    }

    async signIn(req,res){
        try{
            //1.find user by email;
        const user = await this.userRepository.findByEmail(req.body.email);
        if(!user){
            return res.status(400).send('Incorrect Credentials');
        }else{
            //2. compare password with hashed password
            const result = await bcrypt.compare(req.body.password,user.password);
            if(result){
                //3.create Token.
                const token = jwt.sign({_userID:user._id},"ABHISHEKPRAJAPAT");
                //4. Send Token.
                return res.status(200).send(token);
            }else{
                return res.status(400).send('Incorrect Credentials');
            }
        }
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went Wrong");
        }
    }
}