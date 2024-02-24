const { Superhero, Superpower, Image } = require('../models');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createOne = async (req, res, next) => {
    try {
        const { body, file: { filename } } = req;
        const heroInstanse = await Superhero.create(body);
        if (filename) {
            const image = await heroInstanse.createImage({
                path: filename
            });
        };
        if (body.power) {
            const [power, created] = await Superpower.findOrCreate({
                where: {
                    powerName: body.power
                }
            });
            await heroInstanse.addSuperpower(power);
        };
        res.status(201).send({ data: heroInstanse })
    } catch (error) {
        next(error)
    }


};


//update Hero + add superpower
module.exports.updateOne = async (req, res, next) => {
    try {
       const {body, params: {heroId}} = req;
        const heroInstanse = await Superhero.findByPk(heroId);
        if (heroInstanse) {
            const updated = await heroInstanse.update(body);
            if(body.power) {
                const [power, created] = await Superpower.findOrCreate({
                    where: {
                        powerName: body.power
                    }
                });
                await updated.addSuperpower(power);
            }
            res.status(200).send({data: updated});
        } else {
            throw new NotFoundError('Superhero is not found');
        }
    } catch (error) {
       next(error)
    }
   };

module.exports.deleteOne = async (req, res, next) => {
    try {
        const { params: { heroId } } = req;
        const heroInstanse = await Superhero.findByPk(heroId);
        if (heroInstanse) {
            const deleted = await heroInstanse.destroy();
            res.status(204).send({
            meta: {
                deleted: deleted
            }
        });
        } else {
            throw new NotFoundError('Superhero is not found');
        }
    } catch (error) {
        next(error)
    }
};

module.exports.getAll = async (req, res, next) => {
    try {
        const { pagination } = req;
        const heroes = await Superhero.findAll({ ...pagination });
        res.status(200).send({ data: heroes })
    } catch (error) {
        next(error)
    }
};

module.exports.getHeroesWithPowers = async (req, res, next) => {
    try {
        const { pagination } = req;
        const heroes = await Superhero.findAll({
            include: [{
                model: Superpower
            }],
            ...pagination
        });
        res.status(200).send({ data: heroes })
    } catch (error) {
        next(error)
    }
};