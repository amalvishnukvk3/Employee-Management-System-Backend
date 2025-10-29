const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

router.post('/', async (req, res) => {
    try {
        const { name, email, position, department, salary } = req.body;

        const existing = await Employee.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already exists' });

        const employee = await Employee.create({ name, email, position, department, salary });
        res.status(201).json({ message: 'Employee created successfully', employee });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const { search } = req.query;
        const query = search
            ? {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { department: { $regex: search, $options: 'i' } },
                    { position: { $regex: search, $options: 'i' } }
                ]
            }
            : {};

        const employees = await Employee.find(query).sort({ dateOfJoining: -1 });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee updated successfully', employee });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
