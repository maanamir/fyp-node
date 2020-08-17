const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;


const Product = new Schema({
    
    productid:
    {
        type:String
    },
    date : {
        type:Date
    }
  
});


const User = new Schema({
    id: {
        type: String,
        unique: true,
        sparse:true
    },
     name: {
        type: String
    },
     email: {
        type: String,
        unique: true,
        sparse:true

    },
     password: {
        type: String
    },
    role: {
        type: String
    },
    department: {
        type: String
    },
    designation: {
        type: String
    },
    avatar: {
        type: String
    },
    avatar_ext: {
        type: String
    },

    wishlist: {
        type: [Product]
    },
    confirmed: {
        type: Boolean,
        default: false,
      },
    //my wish list
  
    is_deleted: {
        type: Number,
        default: 0
    }
});

User.plugin(mongoosePaginate);

User.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
   }
// User.index({'$**': 'text'});

module.exports = mongoose.model("User", User);