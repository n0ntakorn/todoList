const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const router = express.Router();
const todo = require('./routes/todo');
//Middle ware to parse the body of the request
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
//impport todoModel
const todoModel = require('./model/todoModel');

// 'mongodb+srv://nonny:nonny223@todo.4lobz.mongodb.net/test'
mongoose
  .connect('mongodb://localhost:27017/testy', { useNewUrlParser: true })
  .then(() => {
    app.listen(port, () => {
      console.log('Server started on port ' + port);
    });
  
    app.use('/todo' , todo)
    
  
  })


