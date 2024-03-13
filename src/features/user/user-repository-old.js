// import { getDB } from "../../config/mongodb.js";
// import { ApplicationError } from "../../error-handler/applicationError.js";

// class UserRepository{
//     constructor(){
//         this.collection = "users"
//     }

//     async signUp(newUser){
//         try{
//         //1. Get the Database
//         const db = getDB();
//         //2. Get the collection
//         const collection = db.collection(this.collection)
//         //3. Insert the document.
//         await collection.insertOne(newUser);
//         return newUser;
//         //when we use the local storage for the data then we use the below steps
//         // newUser.id = users.length+1;
//         // users.push(newUser);
//         }catch(err){
//             console.log(err);
//         throw new ApplicationError("Something Went Wrong",500)
//         }
        
//     }
//     async signIn(email,password){
//         try{
//         //1. Get the Database
//         const db = getDB();
//         //2. Get the collection
//         const collection = db.collection(this.collection)
//         //3. find the document.
//         return await collection.findOne({email,password});
//         //when we use the local storage for the data then we use the below steps
//         // newUser.id = users.length+1;
//         // users.push(newUser);
//         }catch(err){
//             console.log(err);
//         throw new ApplicationError("Something Went Wrong",500)
//         }
        
//     }
//     async findByEmail(email){
//         try{
//         //1. Get the Database
//         const db = getDB();
//         //2. Get the collection
//         const collection = db.collection("users")
//         //3. find the document.
//         return await collection.findOne({email});
//         //when we use the local storage for the data then we use the below steps
//         // newUser.id = users.length+1;
//         // users.push(newUser);
//         }catch(err){
//             console.log(err);
//         throw new ApplicationError("Something Went Wrong",500)
//         }
        
//     }
// }

// export default UserRepository;