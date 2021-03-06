const categoriesController = {};
const Categories = require('../models/categories.model');

categoriesController.getAll = async (req, res) => {
  let categories;
  try {
    let merged = {};
    const start = 0;
    const length = 100;
    categories = await Categories.paginate(
      merged,
      {
        offset: parseInt(start),
        limit: parseInt(length)
      }
    );
    res.status(200).send({
      code: 200,
      message: 'Successful',
      data: categories
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};



// categoriesController.getMyProducts = async (req, res) => {
//   let products;
//   if (!req.params._id) {
//     Fu;
//     res.status(500).send({
//       message: 'ID missing'
//     });
//   }
//   try {
    
//     const _id = req.params._id;
//     products = await Products.find( {userid:_id});
//     res.status(200).send({
//       code: 200,
//       message: 'Successful',
//       data: products
//     });
//   } catch (error) {
//     console.log('error', error);
//     return res.status(500).send(error);
//   }
// };


categoriesController.addCategory = async (req, res) => {
  try {
  
    const body = req.body;

    const category = new Categories(body);

  const result = await category.save();

    res.status(200).send({
      code: 200,
      message: 'Category Added Successfully',
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};
module.exports = categoriesController;

// categoriesController.getSingleProduct = async (req, res) => {
//   let product;
//   try {
//     const _id = req.params._id;
//     product = await products.findOne({ _id: _id });
//     res.status(200).send({
//       code: 200,
//       message: 'Successful',
//       data: product
//     });
//   } catch (error) {
//     console.log('error', error);
//     return res.status(500).send(error);
//   }
// };


// categoriesController.deleteProduct = async (req, res) => {
//   if (!req.params._id) {
//     Fu;
//     res.status(500).send({
//       message: 'ID missing'
//     });
//   }
//   try {
//     const _id = req.params._id;

//     const result = await Products.findOneAndDelete({
//       _id: _id
//     });
   
//     res.status(200).send({
//       code: 200,
//       message: 'Deleted Successfully'
//     });
//   } catch (error) {
//     console.log('error', error);
//     return res.status(500).send(error);
//   }
// };



// categoriesController.updateProduct = async (req, res) => {
//   if (!req.params._id) {
//     res.status(500).send({
//       message: 'ID missing'
//     });
//   }
//   try {
//     const _id = req.params._id;
//     let updates = req.body;
//     runUpdate(_id, updates, res);
//   } catch (error) {
//     console.log('error', error);
//     return res.status(500).send(error);
//   }
// };

// async function runUpdate(_id, updates, res) {
//   try {
//     const result = await Products.updateOne(
//       {
//         _id: _id
//       },
//       {
//         $set: updates
//       },
//       {
//         upsert: true,
//         runValidators: true
//       }
//     );

//     {
//       if (result.nModified == 1) {
//         res.status(200).send({
//           code: 200,
//           message: 'Updated Successfully'
//         });
//       } else if (result.upserted) {
//         res.status(200).send({
//           code: 200,
//           message: 'Created Successfully'
//         });
//       } else {
//         res.status(422).send({
//           code: 422,
//           message: 'Unprocessible Entity'
//         });
//       }
//     }
//   } catch (error) {
//     console.log('error', error);
//     return res.status(500).send(error);
//   }
// }
// async function runUpdateById(id, updates, res) {
//   try {
//     const result = await products.updateOne(
//       {
//         id: id
//       },
//       {
//         $set: updates
//       },
//       {
//         upsert: true,
//         runValidators: true
//       }
//     );

//     if (result.nModified == 1) {
//       res.status(200).send({
//         code: 200,
//         message: 'Updated Successfully'
//       });
//     } else if (result.upserted) {
//       res.status(200).send({
//         code: 200,
//         message: 'Created Successfully'
//       });
//     } else {
//       {
//         res.status(200).send({
//           code: 200,
//           message: 'Task completed successfully'
//         });
//       }
//     }
//   } catch (error) {
//     console.log('error', error);
//     return res.status(500).send(error);
//   }
// }