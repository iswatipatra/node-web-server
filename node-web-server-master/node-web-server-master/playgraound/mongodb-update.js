const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if(err){
      return  console.log('unable to connect to server');
    }

        console.log('connected to server');

        //findOneAndUpdate = (filter,update,options,callback)

        // db.collection('Todos').findOneAndUpdate(
        //     {_id: new ObjectID('5c43f5ef4a1b751040c28569')},
        //     {$set : {completed : true} },
        //     {returnOriginal : false}
        //     ).then((results) => {
        //         console.log(results);
        //     } );

        db.collection('users').findOneAndUpdate(
            {_id : new ObjectID('5c486c78899418121cc3d30d')},
            { $set : {name : 'arisha'}, $inc : {age : 1}},
            {returnOriginal : false}).then((results) => {
                console.log(results);
            });
});