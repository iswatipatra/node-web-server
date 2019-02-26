//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');         //destructuring
// var user = {name:'swati',age:22};
// var {name} = user;
// console.log(name);

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => {
    if(err){
        return console.log('unable to connect to mongodb server');
    }

    console.log('connected to mongodb server');
    const db = client.db('TodoApp')
    
    // db.collection('Todos').insertOne({
    //     text: 'something to do',
    //     completed : false
    // },(err,result) => {
    //     if(err)
    //     {
    //         return console.log('unable to insert todo',err);
    //     }

    //     console.log(JSON.stringify(result.ops,undefined,2));
    // }
    // );


    // db.collection('users').insertOne({
    
    //     name: 'sunidhi',
    //     age : 22,
    //     location : 'kalyani nagar'

    // },(err,result) => {
    //     if(err){
    //         return console.log('unable to insert users',err);
    //     }

    //     console.log(JSON.stringify(result.ops,undefined,2));
    //     //console.log(result.ops[0]._id.getTimestamp());
    // }
    
    // );
    client.close();
});



