const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


//Todo.remove({})  //removes everything;

// Todo.remove({}).then((docs) => {
//     console.log(docs);
// })

//Todo.findOneAndRemove   -we get information back
//Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: '5c5ad5822b5540b2416153d8'}).then((todo) => {
    console.log(todo);
});

Todo.findByIdAndRemove('5c5ad5822b5540b2416153d8').then((results)=> {
    console.log(results);
})