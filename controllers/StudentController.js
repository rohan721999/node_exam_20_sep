const StudentServices = require('../services/StudentServices');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

class StudentController {
    async getAllStudent(req, res) {
        try {
            const searchKeyword = req.query.search;
            let startfrom = req.query.start;
            let limit = req.query.limit;
            
            let search = {};
            if(searchKeyword != '' && searchKeyword != undefined) {
                search = { $or: [{ 'fullName': searchKeyword }, { 'email': searchKeyword }] };
            }
            const student = await StudentServices.getStudent(search, startfrom, limit);
            if (student) {
                res.status(200).json(student);
            } else {
                res.status(200).json({ message: 'No Records Found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createStudent(req, res) {
        try {
            const body = req.body;
            const salt = await bcrypt.genSalt(5);
            body['password'] = await bcrypt.hash(body.password, salt);
            body['profilePhoto'] = '';
            if (req.file != undefined && req.file.filename != undefined && req.file.filename != '') {
                body['profilePhoto'] = req.file.filename;
            }
            const student = await StudentServices.addStudent(body);
            res.status(201).json(student);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getStudent(req, res) {
        try {
            const student = await StudentServices.getStudentByID(req.params.id);
            if (!student) {
                res.status(404).json({ message: 'Student not found' });
            } else {
                res.status(200).json(student);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateStudent(req, res) {
        try {
            const body = req.body;
            const salt = await bcrypt.genSalt(5);
            body['password'] = await bcrypt.hash(body.password, salt);
            body['profilePhoto'] = '';
            if (req.file != undefined && req.file.filename != undefined && req.file.filename != '') {                
                body['profilePhoto'] = req.file.filename;
                const getStudent = await StudentServices.getStudentByID(req.params.id);
                if (getStudent.profilePhoto != undefined && getStudent.profilePhoto != '') {
                    const studentControl = new StudentController();
                    const removeImg = studentControl.removeImage(getStudent.profilePhoto);
                }
            }
            const updatedUser = await StudentServices.updateStudent(req.params.id, body);
            if (!updatedUser) {
                res.status(404).json({ message: 'Student not found' });
            } else {
                res.status(200).json(updatedUser);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteStudent(req, res) {
        try {
            const getStudent = await StudentServices.getStudentByID(req.params.id);

            const student = await StudentServices.deleteStudent(req.params.id);
            if (!student) {
                res.status(404).json({message: 'Student Not Found'});
            } else {
                if (getStudent.profilePhoto != undefined && getStudent.profilePhoto != '') {
                    const studentControl = new StudentController();
                    const removeImg = studentControl.removeImage(getStudent.profilePhoto);
                }
                res.status(200).json({message: 'Student has been Deleted'});
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async loginStudent(req, res) {
        try {
            const { email, password } = req.body;
            const student = await StudentServices.getStudentByEmail(email);
            if(!student) res.status(404).json({ message : "Invalid Login Details"});

            const isValid = await bcrypt.compare(password, student.password);
            if(!isValid) res.status(404).json({ message : "Invalid Login Details"});

            const token = jwt.sign(
                {email:student.email, fullName:student.fullName},
                process.env.JWT_SECRETKEY,
                {expiresIn:'1h'}
            )
            
            res.status(200).json({success:'Login Successfully', 'access_token': token, 'expires_in' : '1h'});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeImage(photoPath) {
        if (photoPath) {
            const absolutePath = path.join(__dirname, '../uploads/', photoPath);
            fs.unlink(absolutePath, (err) => {
                if (err) {
                    if (err.code !== 'ENOENT') {
                        console.error("Error deleting old profile photo:", err);
                    }
                }
            });
        }
    };
}

module.exports = new StudentController;