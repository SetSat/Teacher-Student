const express = require('express')
const mongoose = require('mongoose')

const Mentor = require('../model/mentormode')
const Student = require('../model/studentmodel')
const router = express.Router()

router.post('/', async (req, res) => {
    const { name } = req.body;
    const mentor = new Mentor({ name })
    await mentor.save();
    res.status(201).json(mentor)
})
router.get('/mentors', async (req, res) => {
    try {
        const mentors = await Mentor.find();
        res.json(mentors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
router.post('/:mentorId/students/:studentId', async (req, res) => {
    const { mentorId, studentId } = req.params;


    // Update Mentor
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
        return res.status(404).json({ message: "No mentor found with this ID" });
    }
    const student = await Student.findById(studentId);
    if (!student) {
        return res.status(404).json({ message: "No student found with this ID" });
    }
    if (student.mentor) {
        return res.status(400).json({ message: "Student already has a mentor" });
    }
    mentor.students.push(studentId);
    await mentor.save();

    // Update Student

    student.mentor = mentorId;
    await student.save();

    res.json({ mentor, student });
});


router.get('/:mentorId/students', async (req, res) => {
    const { mentorId } = req.params
    const mentor = await Mentor.findById(mentorId).populate('students')

    if (!mentor) {
        return res.status(404).json({ message: 'No mentor found in this ID' })
    }
    res.json(mentor.students)
})
module.exports = router