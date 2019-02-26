const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id : new ObjectID(),
    text: 'first test todo'
},{
    _id: new ObjectID(),
    text: 'second test todo',
    completed: true,
    completedAt:333
}];
// beforeEach((done) => {                         
//     Todo.remove({}).then(() => done());              //wipe all the data from todos
// });

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    } ).then(() => done());
});

describe('POST /todos', () => {                              //describe - multiple test cases
    it('should create a new todo', (done) => {
        var text = 'test todo text';

        request(app)                                       //we have to make request on app
        .post('/todos')
        .send({text})                   //object is passed in send and it get converted to json by supertest                 
        .expect(200)                    //status
        .expect((res) => {
            expect(res.body.text).toBe(text);           //body from res should be equal to text
        })
        .end((err,res) => {                                
            if(err) {
                return done(err);
            }

            Todo.find({text}).then((todos) => {                //fetch all data from collection
                expect(todos.length).toBe(1);            //length to be equal to   1
                expect(todos[0].text).toBe(text);        //if test from todo is equal to text
                done();
            }).catch((e) => done(e));                     //catches the error
        });
    });

    it('should not create todo with invalid body data',(done) => {
        

            request(app)
            .post('/todos')
            .send({})                       
            .expect(400)                              
            .end((err,res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {

                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });

    });
});

describe('GET /todos',() => {
    it('should get all todos',(done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })

        .end(done);
    })
})

describe('GET /todos/:id',() => {
    it('should return todo doc',(done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    
    it('should return 400 if todo not found ',(done) => {
        var hexId = new ObjectID().toHexString();
        
        request(app)
        .get(`/todos/${hexId}`)
        .expect(400)
        .end(done);
    });

        it('should return 404 for non-objects ids',(done) => {
            request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
        });
    
});

// describe('DELETE todos/:id',() => {
//     it('should remove a todo',(done) => {
//         var hexId = todos[1]._id.toHexString();

//         request(app)
//         .delete(`/todos/${hexId}`)
//         .expect(200)
//         .expect((res) => {
//             expect(res.body.todo._id).toBe(hexId);
//         })
//         .end((err,res) => {
//             if(err) {
//                 return done(err);

//             }

//             Todo.findById(hexId).then((todo) => {
//                 expect(todo).toNotExist();
//                 done();
//             }).catch((e) => done(e));
//         });
//     });

//     // it('should return 404 if todo not found',(done) => {

//     // });

//     // it('should return 404 if object id is invalid',(done) => {

//     // });
// });

describe('PATCH /todos/:id',() => {
    it('should update the todo ',(done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'this should be new text'

        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            completed: true,
            text: text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done);

    });


    it('should clear completedat when todo is not completed ',(done) => {
        var hexId = todos[1]._id.toHexString();
        var text = 'this is second text';
        
        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            completed: false,
            text:text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done);



    });
});