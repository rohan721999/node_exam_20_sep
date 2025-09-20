const express = require('express');
const StudentController = require('../controllers/StudentController');

const routes = express.Router();

routes.post('/register', StudentController.createStudent);

routes.post('/login',StudentController.loginStudent);

module.exports = routes;