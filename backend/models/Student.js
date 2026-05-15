const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  address: { type: String, required: true },
  profileImage: { type: String, default: '' }, // URL or base64
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
