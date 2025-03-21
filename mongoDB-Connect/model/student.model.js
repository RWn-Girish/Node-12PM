const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String
    },
    email: String,  // short hand method
    phone: {
        type: String
    },
    course: {
        type: String
    }
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;