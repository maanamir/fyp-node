const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Product = new Schema({
    id: {
        type: Number,
        unique: true,
        sparse:true
    },
     name: {
        type: String
    },
     description: {
        type: String
       

    },
     price: {
        type: Number
    },
    finalprice: {
        type: Number
    },
    category: {
        type: String
    },
    image_url: {
        type: String
    },
    brand:{
        type:String
    },
    storeName:{
        type:String
    },
    city:{
        type:String
    },
    location: {
        type: String
    },
    storeid: {
        type: String
    },
    dealtype: {
        type: String
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    dealid: {
        type: String
    },
    sub_category: {
        type: String
    },
    sub_subcategory: {
        type: String
    },
  
    is_deleted: {
        type: Number,
        default: 0
    }
});

Product.plugin(mongoosePaginate);

// Product.methods.toJSON = function() {
//     var obj = this.toObject();
//     //delete obj.password;
//     return obj;
//    }
// User.index({'$**': 'text'});

module.exports = mongoose.model("Product", Product);