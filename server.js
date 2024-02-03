//1. Import Express
import express from "express";
import ProductRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import bodyParser from "body-parser";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cartiteams/cartitems.routes.js";
const port = 3000;


//2. create server
const server = express();

server.use(bodyParser.json())
//for all request related to product redirect to product, redirect to product routers.
server.use("/api/products",jwtAuth, ProductRouter)
server.use("/api/users",userRouter)
server.use("/api/cartItems",jwtAuth ,cartRouter)

//3. Efault request handler
server.get("/",(req,res)=>{
    res.send("Welcome")
})

//4. specify port.
server.listen(port,()=>{
    console.log(`server is Working on http://localhost:${port}`);
})