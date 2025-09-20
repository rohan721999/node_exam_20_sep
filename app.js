const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig');
const authRoutes = require('./routes/AuthRoutes');
const StudentRoutes = require('./routes/StudentRoutes');
const authorizeStudent = require('./middleware/AuthStudents');

// App Configuration
dotenv.config();
connectDB();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// URLS
app.use('/api/auth', authRoutes);
app.use('/api/students', authorizeStudent, StudentRoutes);

// 404 Page Not Found
app.use((req, res, next) => {
    res.status(404).json({ error: '404 Page Not Found' });
});

// App running details
app.listen(PORT, function () {
    console.log("Server is running on PORT : " + PORT);
})