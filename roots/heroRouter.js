const express = require('express');
const SuperheroController = require('../controllers/Superhero.controller');
const {validateBody, pagination} = require('../middlewares/index');
const upload = require('../middlewares/multer');

const heroRouter = express.Router();

heroRouter.post('/', upload.single('image'), validateBody,  SuperheroController.createOne);

heroRouter.put('/:heroId', SuperheroController.updateOne);
// heroRouter.put('/:heroId', upload.single('image'), SuperheroController.updateOne);

heroRouter.get('/', pagination, SuperheroController.getAll);
heroRouter.get('/superpowers', pagination, SuperheroController.getHeroesWithPowers);
heroRouter.delete('/:heroId', SuperheroController.deleteOne);

module.exports = heroRouter;