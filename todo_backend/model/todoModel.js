const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TodoSchema = new Schema({
     
    date :String,
    time: String,
    todo:String
},
{ versionKey: false },

);

module.exports = mongoose.model('Todo', TodoSchema);