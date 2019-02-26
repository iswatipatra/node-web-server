const {MongoClient,ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if(err){
        return console.log('unable to connect to server');
    }

    console.log('connected to server');

// delete many

// db.collection('users').deleteMany({name : 'swati'}).then((result)=>{
//     console.log(result);
// } );

//delete One

// db.collection('users').deleteOne({name : 'arisha'}).then((result) => {
//     console.log(result);
// });

// find one and delete

// db.collection('Todos').findOneAndDelete({completed : true}).then((results) => {
//     console.log(results);
// })

db.collection('users').findOneAndDelete({_id :new ObjectId('5c486c0c79a2e214f871d5c5')}).then((result) => {
    console.log(result);    
})
});
