import UserModel from '../user/user.model.js'

export default class ProductModel {
    constructor(id,name,desc,price,imageUrl,category,sizes) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.sizes = sizes;
      }
    static add(product){
        product.id= products.length+1;
        products.push(product);
        return product;
    }

    static getAll(){
        return products;
    }

    static get(id){
        const product = products.find(i=> i.id == id);
        return product;
    }

    static filter(minPrice, maxPrice, category){
        const result = products.filter((product)=>{
            return(
            (!minPrice || 
              product.price >= minPrice) &&
            (!maxPrice || 
              product.price <= maxPrice) &&
            (!category || 
              product.category == category)
            );
          });
          return result;
    }
    static rateProduct(userID, productID, rating){
      //1. Validate user and product
      const user = UserModel.getAll().find((u)=>u.id == userID);
      if(!user){
        return "User not Found";
      }

      //Validate Product
      const product = products.find((p)=> p.id == productID);
      if(!product){
        return 'Product not found';
      }

      //2. Check if there are any ratings and if not then add ratings array.
      if(!product.ratings){
        product.ratings=[];
        product.ratings.push({userID:userID,rating:rating});
      }else{
        //check if user ratings is already available.
        const existingRatingIndex = product.ratings.findIndex(r=>r.userID==userID);
        if(existingRatingIndex >=0){
          product.ratings[existingRatingIndex]={
            userID: userID,
            rating: rating
          };
        }else{
          //if no existing rating then add rating here
          product.ratings.push({userID:userID,rating:rating});
        }
      }
    }
}

var products = [
    new ProductModel( 1,'Product 1',
    'Description for Product 1',
    19.99,
    'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/5165He67NEL._SY445_SX342_.jpg',
    'Category1',
    []),

    new ProductModel(2,
     'Product 2',
     'Description for Product 2',
     29.99,
     'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81Wbfijio4L._SY385_.jpg',
     'Category2',
     ['M','L']
     ),

    new ProductModel(3,
        'Product 3',
     'Description for Product 3',
     39.99,
     'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/51COxWxryWL._SY445_SX342_.jpg',
     'Category1',
     ['M','L','XL']
     )
]