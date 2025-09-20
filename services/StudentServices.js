const StudentModel = require('../models/StudentModel');

class StudentServices
{
    async addStudent(data) {
        return await StudentModel(data).save();
    }
    async updateStudent(id, data) {
        return await StudentModel.findByIdAndUpdate(id, data, {new:true, runValidators:true});
    }
    async getStudent(search = '', start = 0, limit= 10) {
        return await StudentModel.find(search).skip(start).limit(limit);
    }
    async getStudentByID(id) {
        return await StudentModel.findById(id);
    }
    async deleteStudent(id) {
        return await StudentModel.findByIdAndDelete(id);
    }
    async getStudentByEmail(email) {
        return await StudentModel.findOne({email});
    }
}

module.exports = new StudentServices();