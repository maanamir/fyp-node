const storesController = {};
const Stores = require('../models/stores.model');

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
      stores = await Stores.paginate(
        merged,
        {
          offset: parseInt(start),
          limit: parseInt(length)
        }
      );
    }
    else{
        console.log('stotetype'+storetype);
        //let list=[];
        //wishlistArray1.push();
        stores = await Stores.find( {storetype:{"$in":[storetype, "General Store"]}});
        
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



module.exports = storesController;

