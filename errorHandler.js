const {ValidationError, DatabaseError} = require('sequelize');

module.exports.errorHandler = async (err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(400).send({
            errors: {
            message: err.message
        }})
    };
    if (err instanceof DatabaseError) {
        return res.status(500).send({
            errors: {
                message: err.message
            }
        })
    };
    res.status(500).send(err)
}