const mongoose = require('mongoose')

const studentModel = new mongoose.Schema({
    name: String,
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }
});


module.exports = mongoose.model("Student", studentModel)

