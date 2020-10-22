const storesController = {};
const Stores = require('../models/users.model');
const Products = require('../models/products.model');
const path = require('path');
const bcrypt = require('bcryptjs');
const jsonwebtoken =  require('jsonwebtoken');
const nodemailer = require('nodemailer');
storesController.getAll = async (req, res) => {
  let stores;
  try {
    let merged = {};
    const start = 0;
    const length = 100;
    stores = await Stores.paginate(
      merged,
      {
        offset: parseInt(start),
        limit: parseInt(length)
      }
    );
    res.status(200).send({
      code: 200,
      message: 'Successful',
      data: stores
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};




storesController.addStore = async (req, res) => {
  try {
  
    const body = req.body;

    const store = new Stores(body);

  const result = await store.save();

    res.status(200).send({
      code: 200,
      message: 'Store Added Successfully',
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

storesController.getCustomList = async (req, res) => {
        
    let stores;
    if (!req.params.storetype) {
        Fu;
        res.status(500).send({
          message: 'ID missing'
        });
      }
    //if the category is all then all local store is retrived 
    //if the category is electronic then genreal store + electronics
    try {
        const storetype = req.params.storetype;
      let merged = {};
      const start = 0;
      const length = 100;
      if(storetype=="All")
      {
        stores = await Stores.find( {role:"store"});
      }
    else{
        console.log('stotetype'+storetype);
        //let list=[];
        //wishlistArray1.push();
        stores = await Stores.find({role:"store",storetype:{"$in":[storetype, "General Store"]}});
        
    }
      res.status(200).send({
        code: 200,
        message: 'Successful',
        data: stores
      });
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };


  storesController.registerStore = async (req, res) => {
    try {
      const body = req.body;
  
      // there must be a password in body
  
      // we follow these 2 steps
  
      const password = body.password;
  
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
  
      body.password = hash;
      body.role="store";
      const user = new Stores(body);
  
      const result = await user.save();
      console.log('result'+result);
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });
  //console.log(process.env.GMAIL_USER+process.env.GMAIL_PASS);
  
  
  jsonwebtoken.sign(
        {
          //_id or id??
          user: result._id,
        },
        process.env.EMAIL_SECRET,
        {
          expiresIn: '7d',
        },
        (err, emailToken) => {
          const url = `https://kyadaam.herokuapp.com/stores/confirmation/${emailToken}`;
  
          transporter.sendMail({
            to: body.email,
            subject: 'Confirm Email',
            html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
          });
        },
  
      );
      
  
      res.send({
        message: 'Signup successful'
      });
    } catch (ex) {
      console.log('ex', ex);
      if(ex.code===11000){
        res
        .send({
          message: 'This email has been registered already',
        })
        .status(500);
      }
      else {
      res
        .send({
          message: 'Error',
          detail: ex
        })
        .status(500);
    }
    }
  };
  
  
  storesController.createdeal = async (req, res) => {

    try{
      var id=req.body._id;
      console.log(id);
      var dealtype = req.body.dealtype;
      console.log(dealtype);
      var start_date = req.body.start_date;
      console.log(start_date);
      var end_date = req.body.end_date;
       console.log(end_date);
      //product will be added later
      //console.log('body'+req.body.productid);
      runUpdateStoreDeal(id, dealtype, start_date,end_date,res);
      const result = await Stores.findOne({ _id: id });
      console.log('result'+result);
      
      const token = jsonwebtoken.sign({
        data: result,
        role: 'store'
     }, process.env.JWT_KEY, { expiresIn: '7d' });
     console.log('orginal'+token);
     res.send({ message: 'token updated', token: token });

    } catch (error) {
      console.log('error', error);
       res.status(500).send(error);
    }
  }

  storesController.addProductToDeal = async (req, res) => {
   
    try{
      var storeid=req.body.storeid;
      console.log(storeid);
      var dealid = req.body.dealid;
      console.log(dealid);
      var productid = req.body.productid;
      console.log(productid);   
      runUpdateStoreDealProductID(storeid,dealid,productid,res);
     res.send({ message: 'no' });

    } catch (error) {
      console.log('error', error);
       res.status(500).send(error);
    }
  }
  async function runUpdateStoreDealProductID(storeid,dealid,productid,res) {
    try {
      const result = await Stores.updateOne(
        {
          _id: storeid,
          'deallist._id':dealid
        },
        {
          //$addToSet:{ deallist : {productid : productid}}
           $push: { "deallist.$.productid": productid }

        //$push: updates
        },
        {
          upsert: true,
          runValidators: true,
          unique:true
          
        }
      );
  
      // {
      //   if (result.nModified == 1) {
      //     res.status(200).send({
      //       code: 200,
      //       message: 'Updated Successfully'
      //     });
      //   } else if (result.upserted) {
      //     res.status(200).send({
      //       code: 200,
      //       message: 'Created Successfully'
      //     });
      //   } else {
      //     res.status(422).send({
      //       code: 422,
      //       message: 'Unprocessible Entity'
      //     });
      //   }
      // }
    } catch (error) {
      console.log('error', error);
      // return res.status(500).send(error);
    }
  }
  

  storesController.GetMyDealList = async (req, res) => {
    let list;
    try {
      const _id = req.params._id;
      list = await Stores.findOne({ _id: _id },{_id:0,deallist:1});
    
      
  
  
 
  
   
    
      res.status(200).send({
        code: 200,
        message: 'Successful',
        data: list
      });
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  }
  async function runUpdateStoreDeal(id, dealtype, start_date,end_date,res) {
    try {
      const result = await Stores.updateOne(
        {
          _id: id
        },
        {
          $addToSet:{ deallist : {dealtype : dealtype,
            start_date : start_date,
            end_date : end_date}}

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
  



  storesController.confirmationToken= async (req, res) => {
    console.log('yup yup yup yup yup yup yup yup yup');
    try {
      //const { user: { _id } } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
      const token = jsonwebtoken.verify(req.params.token, process.env.EMAIL_SECRET);
      console.log(token.user+'is here');
     //console.log('token'+token);
     await Stores.updateOne({
        _id: token.user},{$set:{ confirmed: true} });
        console.log('confirmed is set true');
       
    } catch (e) {
     return res.send('error');
    }
  
    //return res.redirect('http://localhost:4200/login');
    return res.redirect('https://kyadaamstore.netlify.app/login');
    
  };
  
  storesController.loginStore = async (req, res) => {
    try {
        const body = req.body;
    
        const email = body.email;
    
        // lets check if email exists
    
        const result = await Stores.findOne({ email: email ,role:"store"});
        if (!result) {
          // this means result is null
          res.status(401).send({
            Error: 'This store doesnot exists. Please signup first'
          });
          
        } else if(!result.confirmed){
          Error: 'Please confirm your email to login';
        }
           else {
          // email did exist
          // so lets match password
    
          if ( bcrypt.compareSync(body.password, result.password)) {
            // great, allow this user access
                
            result.password = undefined;
    
            const token = jsonwebtoken.sign({
               data: result,
               role: 'store'
            }, process.env.JWT_KEY, { expiresIn: '7d' });
            console.log('orginal'+token);
            res.send({ message: 'Successfully Logged in', token: token });
          } 
          
          else {
            console.log('password doesnot match');
    
            res.status(401).send({ message: 'Wrong email or Password' });
          }
        }
      } catch (ex) {
        console.log('ex', ex);
      }
};

storesController.uploadAvatar = async (req, res) => {
  try {
    const filePath = `images/product/product-${req.params.id}`;
    const ext = path.extname(req.file.originalname);
    const updates = {
      avatar: filePath,
      avatar_ext: ext
    };
    runUpdateById(req.params.id, updates, res);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};
async function runUpdateById(id, updates, res) {
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


module.exports = storesController;

