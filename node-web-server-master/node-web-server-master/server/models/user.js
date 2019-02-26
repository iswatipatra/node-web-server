var mongoose = require('mongoose');

var User = mongoose.model('User',{
    email : {
    type:  String,
    minlength: 1,
    trim: true
    }
}) ;

module.exports = {
    User
};
