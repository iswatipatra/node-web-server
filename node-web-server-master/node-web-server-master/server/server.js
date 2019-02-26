const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
 
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();                   // app stores the application of express
const port = process.env.PORT || 3000;

app.use(bodyParser.json());              //middlewere

app.post('/todos', (req,res) => {           //post route to create resource
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);                            //information at postman
    },(err) =>{
        res.status(400).send(err);
    })
});

app.get('/todos',(req,res) => {
    Todo.find().then((todos) =>{
        res.send({todos});
    },(e) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id',(req,res) => {
    
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
       return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo){
            return res.status(400).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
    //res.send(req.params);
});


app.delete('/todos/:id',(req,res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((doc)=> {
        if(!doc){
            return res.status(404).send();
        }
        res.status(200).send({doc});
    }).catch((e)=> {
        res.status(400).send();
    })
});

app.patch('/todos/:id',(req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);      //contain array which we want to update

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set: body},{new : true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })

});

app.listen(port, () => {                //listening to a port

    console.log(`started on port ${port}`);
});           


module.exports = {app};





// mongoose.promise = global.promise;
// //mongoose.connect('mongodb://localhost:27017/TodoApp');


// // var Todo = mongoose.model('Todo',{
// //     text: {
// //         type: String,
// //         required: true,
// //         minlength: 2,
// //         trim: true
// //     },
// //     completed:{
// //         type: Boolean,
// //         defalut: false
// //     },
// //     completedAt: {
// //         type: Number,
// //         default: null
// //     }
// // });


// // var newTodo = new Todo({
// //     text: 'cook dinner'
// // });

// // var newTodo = new Todo({
// //     text: ' abc '
// // }); 



// // newTodo.save().then((doc)=> {
// //     console.log('saved todo ',doc);
// // },(err) => {
// //     console.log('unable to save');
// // });

// mongoose.connect('mongodb://localhost:27017/Users');

// var user = mongoose.model('user',{
//     email : {
//     type:  String,
//     minlength: 1,
//     trim: true
//     }
// }) ;

// var newUser = new user({
//     email: 'kumari.patra01@gmail.com'
// });

// newUser.save().then((docs)=> {
//     console.log('saved user: ',docs);
// }, (err) => {
//     console.log('unable to save ');
// }
// );