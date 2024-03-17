const mongoose = require('mongoose')

const studentModel = new mongoose.Schema({
    name: String,
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }
});


const Student = mongoose.model("Student", studentModel)

module.exports = Student