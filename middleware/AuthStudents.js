const jwt = require('jsonwebtoken');

function authenticateStudent (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Bearer Token

    if (!token) {
        return res.status(401).json({ errorMessage: "You Don't have Permission" });
    }

    // Verify the Token
    try {
        const verifiedStudent = jwt.verify(token, process.env.JWT_SECRETKEY);
        req.student = verifiedStudent;
        next();
    } catch (err) {
        return res.status(403).json({ errorMessage: "Invalid or Expired Token" });
    }
}

function authorizeStudent () {
    return [
        authenticateStudent,
        (req, res, next) => {
            if (!req.student.email) {
                return res.status(403).json({ errorMessage: "Access Denied" });
            }
            next();
        }
    ]
}

module.exports = authorizeStudent();