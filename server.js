const express = require('express')
const mongoose = require('mongoose')

const app = express()
const mentorapi = require('./api/mentorapi')
const studentapi = require('./api/studentapi')
app.use(express.json());

const PORT = 3000

//connect to mongoose


mongoose.connect('mongodb+srv://sathishmonish:rNG1jodTfSz1Txyx@cluster0.jpose2g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to Mongodb Atlus!'));


app.use('/mentors', mentorapi);
app.use('/student', studentapi)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})