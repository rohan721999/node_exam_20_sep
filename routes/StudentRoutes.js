const express = require('express');
const StudentController = require('../controllers/StudentController');
const validateObjID = require('../middleware/validateObjectID'); // Middleware for validateObjectID
const { studentValidationRules, validate } = require('../middleware/StudentValidation'); // Middleware for StudentDataValidation on Request side
const upload = require('../middleware/uploadFile'); // file upload

const routes = express.Router();

routes.get('/', StudentController.getAllStudent);

routes.post('/', upload.single('profilePhoto'), studentValidationRules(), validate, StudentController.createStudent);

routes.get('/:id', validateObjID, StudentController.getStudent);

routes.put('/:id', upload.single('profilePhoto'), studentValidationRules(), validate, validateObjID, StudentController.updateStudent);

routes.delete('/:id', validateObjID, StudentController.deleteStudent);

module.exports = routes;