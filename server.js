const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const serverConfig = require('./configs/servers.config');
const cors = require('cors')

const app = express();

app.use(cors());

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

app.use(bodyparser.json());


db.on('error',(error)=>{
    console.log('Error while connecting to databse',error);
});

db.once('open',()=>{
    console.log('Connection to mongodb successfully');
})

require('./routes/auth.route')(app);
require('./routes/categories.route')(app);
require('./routes/product.routes')(app);
require('./routes/cart.route')(app);


app.listen(serverConfig.PORT,()=>{
    console.log(`App is listening on the port ${serverConfig.PORT}`);
})