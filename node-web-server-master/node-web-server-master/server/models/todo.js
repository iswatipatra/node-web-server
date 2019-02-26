var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
    text: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    completed:{
        type: Boolean,
        defalut: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});


module.exports = {
    Todo
};