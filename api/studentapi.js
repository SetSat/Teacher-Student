const express = require('express');
const Student = require('../model/studentmodel');

const router = express.Router();

// Create student
router.post('/', async (req, res) => {
    const { name } = req.body;
    const student = new Student({ name });
    await student.save();
    res.status(201).json(student);
});

// Get mentor for a student
router.get('/:studentId/mentor', async (req, res) => {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate('mentor');
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student.mentor);
});

module.exports = router;
