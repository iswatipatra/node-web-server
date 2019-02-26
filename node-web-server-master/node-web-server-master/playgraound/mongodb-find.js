const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if(err){
        return console.log('unable to connect to server');
    }

    console.log('connected to mongodb server');

    // db.collection('Todos').find({_id : new ObjectID('5c4c64b98e14ba0166ba65ff')}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // }, (err) => {
    //     console.log('unable to fetch todos',err);
    //  } );


    
    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`todos count: ${count}`);
        
    // }, (err) => {
    //     console.log('unable to fetch todos',err);
    //  } );

    db.collection('users').find({name: 'swati'}).toArray().then((docs) => {
        console.log('USERS');
        console.log(JSON.stringify(docs,undefined,2));
    }, (err) => {
        console.log('unable to fetch data');
    })
    //db.close();
});
