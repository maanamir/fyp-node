const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Brand = new Schema({
    
    name:
    {
        
        type:String,
        unique: true,
       sparse:true
    }
  
});


  


const Category = new Schema({
    name: {
        type: String,
        unique: true,
        sparse:true
    },
     brands: {
        type: [Brand]
    },
     
  
    is_deleted: {
        type: Number,
        default: 0
    }
});

Category.plugin(mongoosePaginate);

Category.methods.toJSON = function() {
    var obj = this.toObject();
     //delete obj.password;
     return obj;
    }
// User.index({'$**': 'text'});

module.exports = mongoose.model("Category", Category);