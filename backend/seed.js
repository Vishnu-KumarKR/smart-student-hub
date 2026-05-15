const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Student = require('./models/Student');

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing
    await User.deleteMany();
    await Student.deleteMany();

    // Create Admin User
    const admin = await User.create({
      email: 'admin@example.com',
      password: 'password123'
    });
    console.log('Admin user created');

    // Create Students
    const students = [
      {
        name: 'John Doe',
        dob: new Date('2000-05-15'),
        gender: 'Male',
        age: 24,
        email: 'john@example.com',
        phone: '1234567890',
        course: 'Computer Science',
        address: '123 Street, NY',
      },
      {
        name: 'Jane Smith',
        dob: new Date('2001-08-20'),
        gender: 'Female',
        age: 22,
        email: 'jane@example.com',
        phone: '0987654321',
        course: 'Information Technology',
        address: '456 Avenue, CA',
      },
      {
        name: 'Mike Johnson',
        dob: new Date('1999-12-10'),
        gender: 'Male',
        age: 24,
        email: 'mike@example.com',
        phone: '1122334455',
        course: 'Business Administration',
        address: '789 Road, TX',
      },
      {
        name: 'Emily Davis',
        dob: new Date('2002-03-05'),
        gender: 'Female',
        age: 22,
        email: 'emily@example.com',
        phone: '5566778899',
        course: 'Computer Science',
        address: '321 Lane, FL',
      }
    ];

    await Student.insertMany(students);
    console.log('Sample students created');

    process.exit();
  } catch (error) {
    console.error('Error seeding:', error);
    process.exit(1);
  }
};

seed();
