const express = require('express')
const mongoose = require('mongoose')

const app = express()
const mentorapi = require('./api/mentorapi')
const studentapi = require('./api/studentapi')
app.use(express.json());

const PORT = 3000

//connect to mongoose
mongoose.connect('mongodb://localhost:27017/MentorandStudent')
app.use('/mentors', mentorapi);
app.use('/student', studentapi)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})