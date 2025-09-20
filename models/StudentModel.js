const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full Name is Required"]
        },
        email: {
            type: String,
            required: [true, "Email is Required"],
            unique: [true, 'Email is already Exist'],
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
                'Please Enter a Valid Email Address'
            ]
        },
        password: {
            type: String,
            required: [true, "Password is Required"],
            minlength: [8, "Password Must be greater than 8 characters"],
            match: [
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
                'Password must have at least one uppercase letter, one lowercase letter, and one special character'
            ]
        },
        phoneNumber: {
            type: String,
            required: [true, "Phone Number is Required"],
            minlength: [10, 'Phone Number Should be between 10 Digits'],
            maxlength: [10, 'Phone Number Should be between 10 Digits']
        },
        gender: {
            type: String,
            required: [true, "Gender is Required"],
            enum: {
                values : ['Male', 'Female', 'Other'],
                message : '{VALUE} is not a valid gender.'
            },
            default: 'Male'
        },
        enrollmentNumber: {
            type: String,
            required: [true, "Enrollment Number is Required"],
            unique: [true, "Enrollment Number is already Exists"],
            uppercase: true,
            match: [
                /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/,
                'Enrollment number should be AlphaNumeric'
            ]
        },
        semester: {
            type: Number,
            required: [true, "Semester is Required"],
            min: [1, 'Semester Should be between 1 to 12 Number'],
            max: [12, 'Semester Should be between 1 to 12 Number']
        },
        branch:{
            type: String,
            required: [true, "Branch is Required"],
            enum: ['CSE', 'ECE', 'ME', 'CE', 'EE', 'Other'],
            default: 'CSE'
        },
        address: {
            type: String,
            maxlength: [255, ' Address Must be less than 255 Characters']
        },
        profilePhoto: {
            type: String
        }
    }
)

module.exports = mongoose.model('Student', studentSchema);