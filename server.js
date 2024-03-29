//1. Import Express
import "./env.js";
import express from "express";
import swagger from 'swagger-ui-express';
import cors from 'cors';

import ProductRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cartiteams/cartitems.routes.js";
import apiDocs from './swagger.json' assert{type:'json'};
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import {connectToMongoDB} from "./src/config/mongodb.js";
import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import bodyParser from "body-parser";
import orderRouter from "./src/features/order/order-routes.js";
import { connectUsingMongoose } from "./src/config/mongoose-config.js";
import mongoose from "mongoose";
import likeRouter from "./src/features/like/like-routes.js";
const port = 3000;


//2. create server
const server = express();

//load all the enviornment variable.


//CORS policy configration manually
// server.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','*')//if you want to give access to specific client simple replace the URL with '*'
//     res.header('Access-Control-Allow-Headers','*');
//     res.header('Access-Control-Allow-Methods','*');
//     //return ok for preflight request.
//     if(req.method=="OPTIONS"){
//         return res.sendStatus(200);
//     }
//     next();
// })

//CORS POLICY configration using library
var corsOptions={
    origin:'*'
}
server.use(cors(corsOptions));


// server.use(bodyParser.json())
server.use(express.json());
//for all request related to product redirect to product, redirect to product routers.
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
server.use(loggerMiddleware);
server.use('/api/orders',jwtAuth,orderRouter);
server.use("/api/products",jwtAuth, ProductRouter)
server.use("/api/cartItems",jwtAuth ,cartRouter)
server.use("/api/users",userRouter)
server.use("/api/likes",jwtAuth,likeRouter)

//3. Efault request handler
server.get("/",(req,res)=>{
    res.send("Welcome")
})

//Error handler middleware
server.use((err, req, res, next)=>{
    console.log(err);
    if(err instanceof mongoose.Error.ValidationError){
        res.status(400).send(err.message);
    }
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }

    //server Errors
    res.status(500).send("Something went wrong, Please try later");

    
});

//4. middleware to handle 404 request.
server.use((req,res)=>{
    res.status(404).send("API NOT FOUND.")
})

//5. specify port.
server.listen(port,()=>{
    console.log(`server is Working on http://localhost:${port}`);
    console.log(`http://localhost:${port}/api-docs`)
    // connectToMongoDB();
    connectUsingMongoose();
})