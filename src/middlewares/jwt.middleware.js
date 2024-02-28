import jwt from 'jsonwebtoken';
const jwtAuth = (req, res, next)=>{
    // 1. Read the token.
    const token = req.headers['authorization'];
    // 2. if no token, return the error.
    if(!token){
        return res.status(401).send('Unauthorized');
    }
    // 3. check if token is valid.
    try{
      
        const payload = jwt.verify(token,"ABHISHEKPRAJAPAT");
        console.log("payload",payload);
        req.userID = payload._userID;
    } catch(err){
        // 4. return error.
        console.log(err);
        return res.status(401).send('Unauthorized2');
    }

    // 5. call next middleware.
    next();
};

export default jwtAuth;