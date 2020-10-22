require('dotenv').config();
const productsController = {};
const Products = require('../models/products.model');
//const pluck = require('rxjs/operators');
const querystring = require('querystring');
productsController.getAll = async (req, res) => {
  let products;
  try {
    let merged = {};
    const start = 0;
    const length = 100;
    products = await Products.paginate(
      merged,
      {
        offset: parseInt(start),
        limit: parseInt(length)
      }
    );
    res.status(200).send({
      code: 200,
      message: 'Successfu',
      data: products
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

productsController.getAdvancedSearch = async (req, res) => {
  let products;
 
  try {
    const  body  = req.query;
    //console.log(body.length);
  //  if(body.hasOwnProperty('categor'))
   // {
    //    console.log('exist');
   // }
    ///else{
    //  console.log('not exist');
   //}
 //   let c=body.categor;
  //  console.log('c'+c);
  //  if(c!=undefined)
 //   {
   // query=query+'"category":"category"},';
    //let str=Object.values(categorybody);
  // console.log('defined');
    
  //  }  
  //  else{

    //  console.log('un defined');
//}

    
    let categorybody=body.category;
    let brandsbody=[];
    brandsbody=JSON.parse(body.brand);
    let citiesbody=[]  
    citiesbody=JSON.parse(body.city);
    let storeNamesbody=[];
    storeNamesbody=JSON.parse(body.storeName);
    let namebody=body.name;

    //const { search_field } = req.query.category;
    
   // console.log('categoryyyyy'+req.query.category);
    //console.log('search_field'+search_field);
    //console.log('search_value'+search_value);

    const queryObj = {};

    //if (search_field !== '' ) {
     
     // console.log('queryObj'+JSON.stringify(queryObj));
   // }

    ///////////////////

   
    
    //console.log('categoryyyyy'+req.query.category);
    //console.log('search_field'+search_field);
    //console.log('search_value'+search_value);

    //const queryObj = {};

    // if (search_field !== '' ) {
    //   queryObj['shit'] ={"$in":brandsbody};
    //   console.log('queryObj'+JSON.stringify(queryObj));
    // }















   
         console.log('category'+categorybody);
         
         console.log('brands'+brandsbody[0]);
         //let newbrand=JSON.parse(brands);
         //console.log('newbrand'+newbrand[0]);
         console.log('cities'+citiesbody[0]);
         console.log('storeName'+storeNamesbody[0]);
         console.log('name'+namebody);
        // const cate = categorybody;
       //  const search = {};
        // search[categorybody];
        // console.log('search'+search);
         ////////////////////////////
         //if cat is "" and rest is full 

         //let query =  {category:"Electronics", brand:{"$in":[]}, cities:{"$in":[]},
         //storeName:{"$in":[]},name: { "$regex": "Samsung", "$options": "i" }}

         //let query =  '{'
         queryObj['is_deleted'] =0;
         let category={};
         if(categorybody=="All")
         categorybody="";

         if(namebody=="-1-1")
         {
          namebody="";
         console.log('name'+namebody);
         }
    if(categorybody!="")
    {
   // query=query+'"category":"category"},';
    //let str=Object.values(categorybody);
    //category={"$in":[categorybody]};
    queryObj['category'] =categorybody;
    }    
   // else{
      //category = JSON.stringify(category);
      //category=",";
    //}
    
    let brand={};
    if(brandsbody.length!=0){
      //query=query+'"brand":{"$in":"brands"},';
      brand={"$in":brandsbody};
      queryObj['brand'] ={"$in":brandsbody};
    }
    //else
    //{
      //brand = JSON.stringify(brand);
      //brand=",";
   // }
    
    let city={};
    if(citiesbody.length!=0){
      //query=query+'city:{"$in":"cities"},';
      city={"$in":citiesbody};
      queryObj['city'] ={"$in":citiesbody};
    }
    //else
    //{
     // city = JSON.stringify(city);
     // city=','
    //}
   
    let storeName={};
    if(storeNamesbody.length!=0)
    {
      //query=query+'"storeName":{"$in":"storeNames"},';
      storeName={"$in":storeNamesbody};
      queryObj['storeName'] ={"$in":storeNamesbody};
    }
    //else
    //{
     // storeName = JSON.stringify(storeName);
      //storeName=',';
    //}
    
    let name={};
    if(namebody!="")
    {
      //query=query+'"name": { "$regex": "name", "$options": "i" }}';
      name={ "$regex": namebody, "$options": "i" };
      queryObj['name'] ={ "$regex": namebody, "$options": "i" };
     
    }
    //else{
    //  name = JSON.stringify(name);
    //  name=",";
    //}
   // var obj1 ={city:{"$in":"cities"}};
    //var obj2 = querystring.parse('city:{"$in":citiesbody}');
   // var obj3={city:{"$in":citiesbody}};
  //  console.log(obj1);
    //console.log(obj2);
  //  console.log(obj3);
//console.log(query);
//console.log(querystring.parse(query));
 //b.getCollection('products').find(query);
//////////////////////////////////////////////
//let query1={};
//query1['key']=query;
//query1=JSON.stringify(query);
//console.log(query);
//query1=querystring.parse(query);

        //console.log(query1['key']);
         //products = await Products.find( {category:category, brand:{"$in":brands}, city:{"$in":cities},
         //storeName:{"$in":storeNames},name: { "$regex": name, "$options": "i" }});
        // products = await Products.find(query1);
  //products = await Products.find({is_deleted:0});
  //products = await Products.find({products: { "$elemMatch": {'city':{"$in":['Islamabad']}}}});
//var query2={query };
//console.log(query1);
//let str=',';
//let query3 =  {category, brand, city,
       //storeName ,name };

//console.log(query3);
//console.log(categorybody);

console.log('queryObj'+JSON.stringify(queryObj));
products = await Products.find(queryObj);
         res.status(200).send({
          code: 200,
          message: 'Successfullll',
          data: products
        });


  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

productsController.newProductIdForDealList = async (req, res) => {
  let product;
 
  try {
    const  body  = req.query;
    
   
    let storeid=body.storeid;
    console.log(storeid);
    let dealid=body.dealid;
    console.log(dealid);
    let indicator=body.indicator;
    
    console.log(indicator);


    //db.collection.find().limit(1).sort({$natural:-1})
         product = await Products.findOne({storeid:storeid,dealid:dealid}).limit(1).sort({$natural:-1});
  console.log('product baby'+product);
        let productid=product._id;
        console.log(productid);
        
        console.log("yeah kiya ho raha hai");
        if (indicator)
        {
          console.log("i am inside")
                  // const image_Url =
                
                
                  // '/images' + '/product/product-' +
                  // productid + '.jpg';   //we need the product id in this.id
          //update the image_url
          //          runUpdateUrl(productid,image_Url,res);
          //Products.update({storeid:storeid,dealid:dealid},{$set :{image_url : image_Url}});
          console.log('last line done');
        }
        
       
         res.status(200).send({
          code: 200,
          message: 'Successfullllurl',
          data: productid
        });


  } catch (error) {
    console.log('your error', error);
    return res.status(500).send(error);
  }
};

productsController.newProductIdForDealListUpload = async (req, res) => {
  let product;
 
  try {
    const  body  = req.query;
    
   
    let storeid=body.storeid;
    console.log(storeid);
    let dealid=body.dealid;
    console.log(dealid);
    let indicator=body.indicator;
    
    console.log(indicator);


    //db.collection.find().limit(1).sort({$natural:-1})
         product = await Products.findOne({storeid:storeid,dealid:dealid}).limit(1).sort({$natural:-1});
  console.log('product baby'+product);
        let productid=product._id;
        console.log(productid);
        
        console.log("yeah kiya ho raha hai");
        if (indicator)
        {
          console.log("i am inside")
                   const image_Url =
                
                
                   '/images' + '/product/product-' +
                   productid + '.jpg';   //we need the product id in this.id
          //update the image_url
                    runUpdateUrl(productid,image_Url,res);
          //Products.update({storeid:storeid,dealid:dealid},{$set :{image_url : image_Url}});
          console.log('last line done');
        }
        
       
         res.status(200).send({
          code: 200,
          message: 'Successfullllupload',
          data: productid
        });


  } catch (error) {
    console.log('your error', error);
    return res.status(500).send(error);
  }
};

async function runUpdateUrl(_id, image_url, res) {
  //db.city.update({_id:ObjectId("584a13d5b65761be678d4dd4")}, {$set: {"citiName":"Jakarta Pusat"}})
 try {
   const result = await Products.updateOne(
     {
       _id: _id
     },
     {
       $set: {image_url:image_url}
     },
     {
       upsert: true,
       runValidators: true,
       unique:true
       
     }
   );

  //  {
  //    if (result.nModified == 1) {
  //      console.log()
  //      res.status(200).send({
  //        code: 200,
  //        message: 'Updated Successfully'
  //      });
  //    } else if (result.upserted) {
  //      res.status(200).send({
  //        code: 200,
  //        message: 'Created Successfully'
  //      });
  //    } else {
  //      res.status(422).send({
  //        code: 422,
  //        message: 'Unprocessible Entity'
  //      });
  //    }
  //  }
 } catch (error) {
   console.log('our update error', error);
   //return res.status(500).send(error);
 }
}









productsController.getMyProducts = async (req, res) => {
  let products;
  if (!req.params._id) {
    Fu;
    res.status(500).send({
      message: 'ID missing'
    });
  }
  try {
    
    const _id = req.params._id;
    products = await Products.find( {category:_id});
    res.status(200).send({
      code: 200,
      message: 'Succes',
      data: products
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

productsController.getSearchedProducts = async (req, res) => {
  let products;
  if (!req.params._key) {
    Fu;
    res.status(500).send({
      message: 'ID missing'
    });
  }
  try {
    
    const _categorytype = req.params._categorytype;
    console.log(_categorytype);
    const _key = req.params._key;
    console.log(_key);
    if(_key=="-1-1")
    {
      products = await Products.find( {category:_categorytype});
      console.log("yes");
    }
    else
    {
    products = await Products.find( {category:_categorytype, name: { "$regex": _key, "$options": "i" }});
    }
    res.status(200).send({
      code: 200,
      message: 'Suyyyccessful',
      data: products
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};
productsController.getMidWeekProducts = async (req, res) => {
  let products;
  
  try {
    
  
      console.log('hello');
      products = await Products.find( {dealtype:'Mid-Week',is_deleted:0});
    
   
    res.status(200).send({
      code: 200,
      message: 'Suyyyccessful',
      data: products
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};


productsController.getWeekEndProducts = async (req, res) => {
  let products;
  console.log('wh');
  try {
    
  
      console.log('yesss');
      products = await Products.find( {dealtype:'Week-End',is_deleted:0});
    
   
    res.status(200).send({
      code: 200,
      message: 'Suyyyccessful',
      data: products
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

productsController.deleteExpiredProducts = async (req, res) => {
  let products;
  console.log('wh');
  try {
    //get all product whose is_deleted is 0

    products = await Products.find( {is_deleted:0});
  
      //console.log('yesss');
      //products = await Products.find( {dealtype:'Week-End',is_deleted:0});
      let currentDate = new Date();
      
      
      let expiredProducts = [];
      //let fruits: Array<string>;
    for(let i=0;i<products.length;i++)
    {
      var date2 = new Date(products[i]["end_date"]);
      if(date2<currentDate)
      {
        expiredProducts.push(products[i]["_id"]);
      }
    }
   
    console.log('expiredProdcut'+expiredProducts);

    products = await Products.updateMany({_id:{"$in":expiredProducts}},{$set: {'is_deleted': 1}});
   
   console.log('updated');
  } catch (error) {
    console.log('error', error);
   
}
};

productsController.getBasicProducts = async (req, res) => {
  let products;
  
  try {
    console.log('i am in bro believe me!!!')
    let  body  = req.query;
    let _categorytype = body.categorytype;
    console.log(_categorytype);
    let _key = body.key;
    console.log(_key);
  //only All + any keyword
     if(_categorytype=="All" & _key!="-1-1" )
    {
      console.log("category All and keyword=something");
    products = await Products.find( {is_deleted:0,name: { "$regex": _key, "$options": "i" }});
    }
    //only All + no keyword
    else if(_categorytype=="All" & _key=="-1-1" )
    {
      console.log("only All no keywords");
        //only All + any keyword
        //let merged = {};
        //const start = 0;
        //const length = 100;
        products = await Products.find({is_deleted:0});
          //merged,
          //{
            //offset: parseInt(start),
           // limit: parseInt(length)
          //}
  
    }
    else if(_categorytype!="All" & _key!="-1-1" )
    {
      console.log("Anything +any keywords");
      products = await Products.find( {is_deleted:0,category:_categorytype, name: { "$regex": _key, "$options": "i" }});
    }
    else if(_categorytype!="All" & _key=="-1-1" )
    {
      console.log("anything+ no keywords");
      products = await Products.find( {is_deleted:0,category:_categorytype});
    }
    else
    {
     console.log('nothing left bro');
    }
    res.status(200).send({
      code: 200,
      message: 'Suyyyccessful',
      data: products
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

productsController.getAdvancedPlusProducts = async (req, res) => {
  let products;
 
  try {
    
    const category = req.params.category;
    const brand = req.params.brand;
    const city = req.params.city;
    const storeName = req.params.storeName;
    const name = req.params.name;
console.log('here');
    console.log(category);
    console.log(brand);
    console.log(city);
    console.log(storeName);
    console.log(name);
    console.log('here');

   // const _key = req.params._key;
    //console.log(_key);
    // if(_key=="-1-1")
    // {
    //   products = await Products.find( {category:_categorytype});
    //   console.log("yes");
    // }
    // else
    // {
    // products = await Products.find( {category:_categorytype, name: { "$regex": _key, "$options": "i" }});
    // }
    // res.status(200).send({
    //   code: 200,
    //   message: 'Suyyyccessful',
    //   data: products
    // });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};




productsController.addProduct = async (req, res) => {
  try {
  
    const body = req.body;

    const product = new Products(body);

  const result = await product.save();

    res.status(200).send({
      code: 200,
      message: 'Product Added Successfully',
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};
module.exports = productsController;

productsController.getSingleProduct = async (req, res) => {
  let product;
  try {
    const _id = req.params._id;
    product = await products.findOne({ _id: _id });
    res.status(200).send({
      code: 200,
      message: 'Succe',
      data: product
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};


productsController.deleteProduct = async (req, res) => {
  if (!req.params._id) {
    Fu;
    res.status(500).send({
      message: 'ID missing'
    });
  }
  try {
    const _id = req.params._id;

    const result = await Products.findOneAndDelete({
      _id: _id
    });
   
    res.status(200).send({
      code: 200,
      message: 'Deleted Successfully'
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};



productsController.updateProduct = async (req, res) => {
  if (!req.params._id) {
    res.status(500).send({
      message: 'ID missing'
    });
  }
  try {
    const _id = req.params._id;
    let updates = req.body;
    runUpdate(_id, updates, res);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

async function runUpdate(_id, updates, res) {
  try {
    const result = await Products.updateOne(
      {
        _id: _id
      },
      {
        $set: updates
      },
      {
        upsert: true,
        runValidators: true
      }
    );

    {
      if (result.nModified == 1) {
        res.status(200).send({
          code: 200,
          message: 'Updated Successfully'
        });
      } else if (result.upserted) {
        res.status(200).send({
          code: 200,
          message: 'Created Successfully'
        });
      } else {
        res.status(422).send({
          code: 422,
          message: 'Unprocessible Entity'
        });
      }
    }
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
}
async function runUpdateById(id, updates, res) {
  try {
    const result = await products.updateOne(
      {
        id: id
      },
      {
        $set: updates
      },
      {
        upsert: true,
        runValidators: true
      }
    );

    if (result.nModified == 1) {
      res.status(200).send({
        code: 200,
        message: 'Updated Successfully'
      });
    } else if (result.upserted) {
      res.status(200).send({
        code: 200,
        message: 'Created Successfully'
      });
    } else {
      {
        res.status(200).send({
          code: 200,
          message: 'Task completed successfully'
        });
      }
    }
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
}


productsController.AddToReviewList = async (req, res) => {
  if (!req.params.pid) {
    res.status(500).send({
      message: 'ID missing'
    });
  }
  try {
    // comment: [null, [Validators.required]],
//     rating: [null, [Validators.required]],
//     userid: [this.userService.getid()],
//     name:[this.name],  //name from token
//     image:[this.image], //images from token
//     is_commented: [1]
    console.log('hello');
    const productid = req.params.pid;
    //const _productid=req.params._productid;
    console.log('id'+productid);
    let comment = req.body.comment;
    let rating = req.body.rating;
    let userid = req.body.userid;
    let name = req.body.name;
    let image = req.body.image;
    let is_commented = req.body.is_commented;





   
    console.log('body'+req.body.userid);
    runUpdateReviewList(productid, req.body, res);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};


async function runUpdateReviewList(productid, body, res) {
  try {
    const result = await Products.updateOne(
      {
        _id: productid
      },
      {
        $addToSet:{ reviewlist : body}
      //$push: updates
      },
      {
        upsert: true,
        runValidators: true,
        unique:true
        
      }
    );

    {
      if (result.nModified == 1) {
        res.status(200).send({
          code: 200,
          message: 'Updated Successfully'
        });
      } else if (result.upserted) {
        res.status(200).send({
          code: 200,
          message: 'Created Successfully'
        });
      } else {
        res.status(422).send({
          code: 422,
          message: 'Unprocessible Entity'
        });
      }
    }
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
}

productsController.GetReviewList = async (req, res) => {
  let user;
  try {
    const _id = req.params.pid;
    //user = await Products.findOne({ _id: pid });
    let reviewlist=await Products.find({"_id" : _id},
    {_id:0,'reviewlist': 1});
    //db.getCollection('users').find({"_id" : ObjectId("5f0b5743c424cb72d07dc67c")},{_id:0,'wishlist.productid': 1})
    console.log('wishlist'+reviewlist);


let wishlistArray=reviewlist[0]["reviewlist"];
// let wishlistArray1=[];
// for(let i=0;i<wishlistArray.length;i++)
// {
//   wishlistArray1.push(wishlistArray[i]["productid"]);
//   console.log(wishlistArray[i]["productid"]);
// }



//    // let wishlistArray=wishlist.aggregate([
//      // { 
//         //  $project: { _id: 0, productid: { 
//          //     $map: { input: $wishlist, as: ar, in: $$ar.data } } }
//      // }
      
//   //])
//   console.log('wishlistArray'+wishlistArray);
//   console.log('wishlistArray1'+wishlistArray1);
//   let finalishlist=await productsModel.find({_id:{"$in":wishlistArray1}});
//   console.log("final wishlist"+finalishlist);

 
  
    res.status(200).send({
      code: 200,
      message: 'Successful',
      data: wishlistArray
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};



productsController.removeReviewFromReviewList = async (req, res) => {
 
 //user id
  if (!req.params.pid) {
    res.status(500).send({
      message: 'ID missing'
    });
  }
  try {
    const pid = req.params.pid;
    //const _productid=req.params._productid;
    
    let updates = req.body;
   console.log('remove remove remove remove');
    console.log(req.body);
    runUpdateReviewListDelete(pid, updates, res);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};


async function runUpdateReviewListDelete(pid, updates, res) {
  try {
    const result = await Products.updateOne(
      {
        _id: pid
      },
      {
        $pull: updates
      },
      {
        upsert: true,
        runValidators: true,
        unique:true
        
      }
    );

    //>db.items1.update( { _id: 1 },{ $unset: {"purqty": ""}})

    {
      if (result.nModified == 1) {
        res.status(200).send({
          code: 200,
          message: 'Updated Successfully'
        });
      } else if (result.upserted) {
        res.status(200).send({
          code: 200,
          message: 'Created Successfully'
        });
      } else {
        res.status(422).send({
          code: 422,
          message: 'Unprocessible Entity'
        });
      }
    }
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
}

productsController.uploadAvatar = async (req, res) => {
  try {
    const filePath = `images/product/product-${req.params.id}`;
    const ext = path.extname(req.file.originalname);
    const updates = {
      avatar: filePath,
      avatar_ext: ext
    };
    runnUpdateById(req.params.id, updates, res);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

async function runnUpdateById(id, updates, res) {
  try {
    const result = await Products.updateOne(
      {
        _id: id
      },
      {
        $set: updates
      },
      {
        upsert: true,
        runValidators: true
      }
    );

    if (result.nModified == 1) {
      res.status(200).send({
        code: 200,
        message: 'Updated Successfully'
      });
    } else if (result.upserted) {
      res.status(200).send({
        code: 200,
        message: 'Created Successfully'
      });
    } else {
      {
        res.status(200).send({
          code: 200,
          message: 'Task completed successfully'
        });
      }
    }
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
}