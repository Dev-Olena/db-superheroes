const yup = require('yup');

module.exports.heroCreateSchema = yup.object ({
    nickName: yup.string('Nickname must be a string').min(5, 'Nickname should contain at least 5 characters').max(20, 'Nickname should not contain more than 20 characters').required(),
    realName: yup.string('Real name must be a string').min(2, 'Real name should contain at least 2 characters').max(100, 'Real name should not contain more than 100 characters').required(),
    originDescription: yup.string('Origin description must be a string'),
    catchPhrase: yup.string('Catch phrase must be a string')
});