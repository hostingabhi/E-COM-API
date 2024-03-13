import express from 'express';
import { LikeController } from './like-controller.js';

const likeRouter = express.Router();

const likeController = new LikeController();

likeRouter.post("/",(req,res,next)=>{
    likeController.likeIteam(req,res,next);
})

likeRouter.get("/",(req,res,next)=>{
    likeController.getLikes(req,res,next);
})
export default likeRouter;