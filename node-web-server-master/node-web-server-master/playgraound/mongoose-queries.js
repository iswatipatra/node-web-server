const {ObjectID} = require('mongodb');


const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5c5684ff4db721301570a5841';


// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id : id
// }).then((todos) => {
//     console.log('Todos',todos);
// });

// Todo.findOne({
//     _id : id
// }).then((todo) => {
//     console.log('Todos',todo);
// });


// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todos',todo);
// }).catch((e) => console.log(e));

// var id = '5c4ebaf3635e98ec1b52fa97';

User.findById(id).then((user) => {
    if(!user){
        return console.log('user not found');
    } 
    console.log('user',user);
}).catch((e)=> console.log(e));