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
    
   
    let categorybody=body.category;
    let brandsbody=[];
    brandsbody=JSON.parse(body.brand);
    let citiesbody=[]  
    citiesbody=JSON.parse(body.city);
    let storeNamesbody=[];
    storeNamesbody=JSON.parse(body.storeName);
    let namebody=body.name;
         console.log('category'+categorybody);
         
         console.log('brands'+brandsbody[0]);
         //let newbrand=JSON.parse(brands);
         //console.log('newbrand'+newbrand[0]);
         console.log('cities'+citiesbody[0]);
         console.log('storeName'+storeNamesbody[0]);
         console.log('name'+namebody);

         ////////////////////////////
         //if cat is "" and rest is full 

         //let query =  {category:"Electronics", brand:{"$in":[]}, cities:{"$in":[]},
         //storeName:{"$in":[]},name: { "$regex": "Samsung", "$options": "i" }}
         let query =  '{'
         let category={};
    if(categorybody!="")
    {
    query=query+'"category":"category"},';
    //let str=Object.values(categorybody);
    category={"$in":[categorybody]};
    }
    else{
      category = JSON.stringify(category);
      category=",";
    }
    
    let brand={};
    if(brandsbody.length!=0){
      query=query+'"brand":{"$in":"brands"},';
      brand=
        {"$in":brandsbody};

    }
    else
    {
      brand = JSON.stringify(brand);
      brand=",";
    }
    
    let city={};
    if(citiesbody.length!=0){
      query=query+'city:{"$in":"cities"},';
      city={"$in":citiesbody};
    }
    else
    {
      city = JSON.stringify(city);
      city=','
    }
   
    let storeName={};
    if(storeNamesbody.length!=0)
    {
      query=query+'"storeName":{"$in":"storeNames"},';
      storeName={"$in":storeNamesbody};

    }
    else
    {
      storeName = JSON.stringify(storeName);
      storeName=',';
    }
    
    let name={};
    if(namebody!="")
    {
      query=query+'"name": { "$regex": "name", "$options": "i" }}';
      name={ "$regex": namebody, "$options": "i" };
      
     
    }
    else{
      name = JSON.stringify(name);
      name=",";
    }
   
   
console.log(query);
//console.log(querystring.parse(query));
 //b.getCollection('products').find(query);
//////////////////////////////////////////////
//let query1={};
//query1['key']=query;
//query1=JSON.stringify(query);
console.log(query);
query1=querystring.parse(query);

        //console.log(query1['key']);
         //products = await Products.find( {category:category, brand:{"$in":brands}, city:{"$in":cities},
         //storeName:{"$in":storeNames},name: { "$regex": name, "$options": "i" }});
         products = await Products.find(query1);
//var query2={query };
console.log(query1);
let str=',';
let query3 =  {category, brand, city,
       storeName ,name };

console.log(query3);
console.log(categorybody);

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



    //db.collection.find().limit(1).sort({$natural:-1})
         product = await Products.findOne({storeid:storeid,dealid:dealid}).limit(1).sort({$natural:-1});
  console.log('product baby'+product);
        let productid=product._id;
        console.log(productid);
         res.status(200).send({
          code: 200,
          message: 'Successfullll',
          data: productid
        });


  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};
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