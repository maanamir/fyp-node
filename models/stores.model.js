const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Product = new Schema({
    
    productid:
    {
        
        type:String,
        unique: true,
       sparse:true
    }
  
});


const Store = new Schema({
    name: {
        type: String,
        unique: true,
        sparse:true
    },
     storetype: {
        type: String
    },
     
    productlist: {
        type: [Product]
    },
    city: {
        type:String
    },
    location:{
        type:String
    },


  
    is_deleted: {
        type: Number,
        default: 0
    }
});

Store.plugin(mongoosePaginate);

Store.methods.toJSON = function() {
   var obj = this.toObject();
     //delete obj.password;
     return obj;
    }
// User.index({'$**': 'text'});

module.exports = mongoose.model("Store", Store);