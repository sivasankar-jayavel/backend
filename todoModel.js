const mongoose = require('mongoose');

const Todo = new mongoose.Schema({
    todo_description:{
        type: String,       
    },
    todo_job:{
        type: String,
    },
    todo_completed:{
        type: Boolean,    
    }
})

module.exports = mongoose.model('Todo',Todo)