const mongoose = require('mongoose');

const validation = function (req, res, next) {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({ error: 'Invalid ID' });
    }
    next();
}

module.exports = validation;