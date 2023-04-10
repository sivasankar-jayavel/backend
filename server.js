const express = require('express');
const app = express();
const {mongoose} = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000
const Todo = require('./todoModel');
const todoRoutes = express.Router();

async function connectDB (){
   await mongoose.connect("mongodb://127.0.0.1:27017/todolist-task",{
        useNewUrlParser : true,
        useUnifiedTopology:true
    });
    console.log("MongoDB is connected");
};

todoRoutes.route('/').get(async function(req,res){
const todos = await Todo.find();
res.send(todos);
})

todoRoutes.route('/:id').get(async function(req,res){
    let id = req.params.id;
    const todoItem = await Todo.findById(id);
    res.send(todoItem)
});

todoRoutes.route('/update/:id').post( async function(req,res){
    const todo = await Todo.findById(req.params.id);
        if(!todo){
            res.status(404).send('data is not availabale ');
        }
        else{
            todo.todo_description = req.body.todo_description;
            todo.todo_job = req.body.todo_job;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo Updated')
            }).catch(err=>{
                res.status(400).send('Update Not Possible');
            })
        }
    })


todoRoutes.route('/add').post(function(req,res){
    let todo = new Todo(req.body);
    todo.save().then(todo=>{
        res.status(200).json({'todo':'todo added successfully'});
    }).catch(err=>{
        res.status(400).send('adding new todo failed');
    })
})

todoRoutes.route('/delete/:id').delete(async function(req,res){
  const id = req.params.id;
  console.log('id is:',id);
  const result = await Todo.deleteOne({_id:id});
  console.log(result);
  res.send(result);
})

app.use(cors());
app.use(bodyParser.json());
app.use('/todos',todoRoutes);

app.listen(PORT,()=>{
    connectDB();
    console.log("My Server is running on port",PORT);
})