const usersController = {};
const Users = require('../models/users.model');
const path = require('path');
const bcrypt = require('bcryptjs');
const jsonwebtoken =  require('jsonwebtoken');
const usersModel = require('../models/users.model');
const productsModel = require('../models/products.model');


const nodemailer = require('nodemailer');
usersController.getAll = async (req, res) => {
  let users;
  try {
    let merged = {};
    const start = 0;
    const length = 100;
    
    users = await Users.paginate(
      merged,
      { password: 0 },
      {
        password: 0,
        offset: parseInt(start),
        limit: parseInt(length)
      }
    );
    res.status(200).send({
      code: 200,
      message: 'Successful',
      data: users
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

usersController.getSingleUser = async (req, res) => {
  let user;
  try {
    const _id = req.params._id;
    user = await Users.findOne({ id: _id });
    res.status(200).send({
      code: 200,
      message: 'Successful',
      data: user
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};



usersController.GetMyWishList = async (req, res) => {
  let user;
  try {
    const _id = req.params._id;
    user = await Users.findOne({ _id: _id });
    let wishlist=await Users.find({"_id" : _id},
    {_id:0,'wishlist.productid': 1});
    //db.getCollection('users').find({"_id" : ObjectId("5f0b5743c424cb72d07dc67c")},{_id:0,'wishlist.productid': 1})
    console.log('wishlist'+wishlist);


let wishlistArray=wishlist[0]["wishlist"];
let wishlistArray1=[];
for(let i=0;i<wishlistArray.length;i++)
{
  wishlistArray1.push(wishlistArray[i]["productid"]);
  console.log(wishlistArray[i]["productid"]);
}



   // let wishlistArray=wishlist.aggregate([
     // { 
        //  $project: { _id: 0, productid: { 
         //     $map: { input: $wishlist, as: ar, in: $$ar.data } } }
     // }
      
  //])
  console.log('wishlistArray'+wishlistArray);
  console.log('wishlistArray1'+wishlistArray1);
  let finalishlist=await productsModel.find({_id:{"$in":wishlistArray1}});
  console.log("final wishlist"+finalishlist);

 
  
    res.status(200).send({
      code: 200,
      message: 'Successful',
      data: finalishlist
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

usersController.registerUser = async (req, res) => {
  try {
    const body = req.body;

    // there must be a password in body

    // we follow these 2 steps

    const password = body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    body.password = hash;
    const user = new Users(body);

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
        const url = `http://localhost:3000/users/confirmation/${emailToken}`;

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


usersController.confirmationToken= async (req, res) => {
  console.log('yup yup yup yup yup yup yup yup yup');
  try {
    //const { user: { _id } } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    const token = jsonwebtoken.verify(req.params.token, process.env.EMAIL_SECRET);
    console.log(token.user+'is here');
   //console.log('token'+token);
   await Users.updateOne({
      _id: token.user},{$set:{ confirmed: true} });
      console.log('confirmed is set true');
     
  } catch (e) {
   return res.send('error');
  }

  return res.redirect('http://localhost:4200/login');
};


usersController.loginUser = async (req, res) => {
    try {
        const body = req.body;
    
        const email = body.email;
    
        // lets check if email exists
    
        const result = await Users.findOne({ email: email });
        if (!result) {
          // this means result is null
          res.status(401).send({
            Error: 'This user doesnot exists. Please signup first'
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
               role: 'User'
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

usersController.checkPassword = async (req, res) => {
  try {
      const body = req.body;
  
      const email = body.email;
      const password = body.password;
  
      // lets check if email exists
  
      const result = await Users.findOne({ email: email });
      if (!result) {
        // this means result is null
        var indicator=false;
        res.status(401).send({
          Error: 'This user doesnot exists. Please signup first'
        });
      } else {
        // email did exist
        // so lets match password
  
        if ( bcrypt.compareSync(body.password, result.password)) {
          // great, allow this user access
              indicator=true;
          result.password = undefined;
  
         

          var data = {
           
            indicator: indicator
          };
          
          res.send({ message: 'indicator response', data: data });
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

usersController.getNextId = async (req, res) => {
  try {
    const max_result = await Users.aggregate([
      { $group: { _id: null, max: { $max: '$id' } } }
    ]);

    let nextId;
    if (max_result.length > 0) {
      nextId = max_result[0].max + 1;
    } else {
      nextId = 1;
    }

    var data = {
      code: 200,
      data: { id: nextId }
    };
    res.status(200).send(data);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

usersController.deleteUser = async (req, res) => {
  if (!req.params._id) {
    Fu;
    res.status(500).send({
      message: 'ID missing'
    });
  }
  try {
    const _id = req.params._id;

    const result = await Users.findOneAndDelete({
      _id: _id
    });
    //   const result = await Inventory.updateOne({
    //         _id: _id
    //     }, {
    //         $set: {is_deleted: 1}
    //     }, {
    //         upsert: true,
    //         runValidators: true
    //     });
    res.status(200).send({
      code: 200,
      message: 'Deleted Successfully'
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};
usersController.uploadAvatar = async (req, res) => {
  try {
    const filePath = `images/avatar/avatar-${req.params.id}`;
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

usersController.getAvatar = async (req, res) => {
 
 
  try {
    const filePath = 'uploads/avatar/avatar-5f23cb4f62953c46584e0035.jpg';
   
   
    res.status(200).send({
      code: 200,
      message: 'Successful',
      data: filePath
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};


usersController.updateUser = async (req, res) => {
  if (!req.params._id) {
    res.status(500).send({
      message: 'ID missing'
    });
  }
  try {
    const _id = req.params._id;
    let updates = req.body;
    runUpdate(_id, updates, res);
  //   const result = await Users.findOne({ _id: id });
  //   const token = jsonwebtoken.sign({
  //     data: result,
  //     //role: 'store'
  //  }, process.env.JWT_KEY, { expiresIn: '7d' });
   //console.log('orginal'+token);
  // res.send({ message: 'token updated', token: token });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};


usersController.AddProductToWishList = async (req, res) => {
  if (!req.params._id) {
    res.status(500).send({
      message: 'ID missing'
    });
  }
  try {
    console.log('hello');
    const _id = req.params._id;
    //const _productid=req.params._productid;
    console.log('id'+_id);
    let pid = req.body.productid;
   
    console.log('body'+req.body.productid);
    runUpdateWishList(_id, pid, res);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};


usersController.updatePassword = async (req, res) => {
  if (!req.params._id) {
    res.status(500).send({
      message: 'ID missing'
    });
  }
  try {
    
    const body = req.body;
    const _id = req.params._id;
// there must be a password in body

// we follow these 2 steps

const password = body.updatepassword;
console.log(password);
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(password, salt);

body.password = hash;
//password=body.password;
//var _id=body._id;
   
    //console.log(req.body);
    runUpdatePassword(_id, body.password, res);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

async function runUpdatePassword(_id, password, res) {
   //db.city.update({_id:ObjectId("584a13d5b65761be678d4dd4")}, {$set: {"citiName":"Jakarta Pusat"}})
  try {
    const result = await Users.updateOne(
      {
        _id: _id
      },
      {
        $set: {password:password}
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


async function runUpdateWishList(_id, pid, res) {
  try {
    const result = await Users.updateOne(
      {
        _id: _id
      },
      {
        $addToSet:{ wishlist : {productid : pid}}
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


usersController.removeProductFromWishList = async (req, res) => {
  if (!req.params._id) {
    res.status(500).send({
      message: 'ID missing'
    });
  }
  try {
    const _id = req.params._id;
    //const _productid=req.params._productid;
    
    let updates = req.body;
   
    console.log(req.body);
    runUpdateWishListProductDelete(_id, updates, res);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};


async function runUpdateWishListProductDelete(_id, updates, res) {
  try {
    const result = await Users.updateOne(
      {
        _id: _id
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




async function runUpdate(_id, updates, res) {
  try {
    const result = await Users.updateOne(
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
    const result = await Users.updateOne(
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



module.exports = usersController;