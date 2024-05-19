const express = require('express')
const mongoose = require( 'mongoose' )
const bodyParser = require( 'body-parser' )
const pug = require('pug')
const multer = require('multer')

const app = express()
const upload = multer()

app.use(upload.array())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'pug')

mongoose.connect( 'mongodb+srv://savinkisunu:HaqQUC3F8DxWCywh@cluster0.ei28zo1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' )
    .then(() => console.log( 'Connected to MongoDB' ))
    .catch(err => console.error( 'Could not connect to MongoDB' , err))

const todoSchema = new mongoose.Schema({
    taskName: String,
    });
const ToDo = mongoose.model( 'ToDo' , todoSchema)

async function createPost(taskName) {
    const todo = new ToDo({
        taskName: taskName ,
    });
    const result = await todo.save()
    console.log(result);
}
async function getPosts() {
    var todos  = []
    const todo = await ToDo
    .find({})
    .then((data) => {
        console.log(data);
        todos = data
    })
    .catch((err) => {
        console.error("Error: ", err);
    })
    return todos
}
async function updatePost(id, newTaskName) {
    const todo = await ToDo.findOne({_id: id});
    todo.set({
        taskName : newTaskName ,
    });
    const result = await todo.save();
    console.log(result);
}
function deletePost(id) {
    ToDo.deleteOne({_id: id})
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.error("Error: ", err);
        });
}

app.get('/', async (req, res)=> {
    res.render( 'index' , {toDoList: await getPosts()})
})
app.post('/todos', async (req, res)=>{
    createPost(req.body.taskName)
    res.render( 'index' , {toDoList: await getPosts()})
})
app.delete('/todos/:id', async (req, res)=>{
    deletePost(req.params.id)
    res.render( 'index' , {toDoList: await getPosts()})
})

app.listen(3000, ()=> console.log('listnening on port 3000'))
