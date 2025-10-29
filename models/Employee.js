const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Employee name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  position: {
    type: String,
    required: [true, 'Position is required']
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required']
  },
  dateOfJoining: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
