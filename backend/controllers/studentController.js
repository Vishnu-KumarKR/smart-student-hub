const Student = require('../models/Student');

// @desc    Get all students
// @route   GET /api/students
// @access  Private
const getStudents = async (req, res) => {
  try {
    const students = await Student.find({}).sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching students' });
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Private
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching student' });
  }
};

// @desc    Create a student
// @route   POST /api/students
// @access  Private
const createStudent = async (req, res) => {
  try {
    const { name, dob, gender, age, email, phone, course, address, profileImage } = req.body;

    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res.status(400).json({ message: 'Student with this email already exists' });
    }

    const student = new Student({
      name,
      dob,
      gender,
      age,
      email,
      phone,
      course,
      address,
      profileImage
    });

    const createdStudent = await student.save();
    res.status(201).json(createdStudent);
  } catch (error) {
    res.status(400).json({ message: 'Invalid student data' });
  }
};

// @desc    Update a student
// @route   PUT /api/students/:id
// @access  Private
const updateStudent = async (req, res) => {
  try {
    const { name, dob, gender, age, email, phone, course, address, profileImage } = req.body;

    const student = await Student.findById(req.params.id);

    if (student) {
      student.name = name || student.name;
      student.dob = dob || student.dob;
      student.gender = gender || student.gender;
      student.age = age || student.age;
      student.email = email || student.email;
      student.phone = phone || student.phone;
      student.course = course || student.course;
      student.address = address || student.address;
      if (profileImage !== undefined) {
        student.profileImage = profileImage;
      }

      const updatedStudent = await student.save();
      res.json(updatedStudent);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid update data' });
  }
};

// @desc    Delete a student
// @route   DELETE /api/students/:id
// @access  Private
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (student) {
      await student.deleteOne();
      res.json({ message: 'Student removed' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting student' });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
