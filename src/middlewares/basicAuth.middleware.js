import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req,res,next)=>{
    //1.Check if authorization header is empty

    const authHeader = req.headers["authorization"];

    if(!authHeader){
        return res.status(401).send("No Authorization Details found");
    }
    console.log(authHeader);
    //2. Extract credentials [Basic slkdflksjdfk].
    const base64Credentials = authHeader.replace('Basic','');
    console.log(base64Credentials);
    
    //3. decode credentials.

    const decodedCred = Buffer.from(base64Credentials,'base64').toString('utf-8')
    console.log(decodedCred);
    const creds = decodedCred.split(':');
    
    const users = UserModel.getAll().find(u=> u.email == creds[0] && u.password == creds[1]);
    if(users){
        next();
    }
    else{
        return res.status(401).send("Incorrect Credentials");
    }


}

export default basicAuthorizer;