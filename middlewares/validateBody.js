const {heroCreateSchema} = require('../validationSchemas/heroSchema');

module.exports.validateBody = async (req, res, next) => {
    try {
        const {body} = req;
        const result = await heroCreateSchema.validate(body);
        next();

    } catch (error) {
        next(error)
    }
};