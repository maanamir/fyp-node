const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
require('dotenv').config();
const errorHandler = require("./middleware/error-handler");
const errorMessage = require("./middleware/error-message");
const accessControls = require("./middleware/access-controls");
const mail=require("./config/mail");
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const nodemailer= require('nodemailer');
const jwt = require('jsonwebtoken');
const Users = require('./models/users.model');
var schedule = require('node-schedule');


const bodyParser = require('body-parser')
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
//new


  const SECRET = 'aslkdjlkaj10830912039jlkoaiuwerasdjflkasd';
const SECRET_2 = 'ajsdklfjaskljgklasjoiquw01982310nlksas;sdlkfj';
const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf';
  
  app.use(bodyParser.json()); // to support JSON-encoded bodies
  
// Requiring Routes

const UsersRoutes = require('./routes/users.routes');
const ProductsRoutes = require('./routes/products.routes');
const CategoriesRoutes = require('./routes/categories.routes');
const StoresRoutes = require('./routes/stores.routes');

// connection to mongoose
const mongoCon = process.env.mongoCon;

mongoose.connect(mongoCon,{ useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true });


const fs = require('fs');
fs.readdirSync(__dirname + "/models").forEach(function(file) {
    require(__dirname + "/models/" + file);
});

// in case you want to serve images 
//app.use(express.static("public"));


app.use('/images', express.static(path.join(__dirname, 'uploads')));




console.log('__dirname'+ __dirname);


//app.use();



app.get('/',  function (req, res) {
  res.status(200).send({
    message: 'Express backend server'});
});





//app.set('port', (3000));
app.set('port', (process.env.PORT));

app.use(accessControls);
app.use(cors());

// Routes which should handle requests
app.use("/users",UsersRoutes);
app.use("/products",ProductsRoutes);
app.use("/categories",CategoriesRoutes);
app.use("/stores",StoresRoutes);

app.use(errorHandler);

app.use(errorMessage);



server.listen(app.get('port'));
console.log('listening on port',app.get('port'));






