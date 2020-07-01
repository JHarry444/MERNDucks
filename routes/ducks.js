const router = require('express').Router();
const {get, getAll, create, remove, replace, update} = require('../services/duck_service');

router.get('/getAll', getAll);

router.get('/get/:id', get);

router.delete('/delete/:id', remove);

router.post('/create', create);

router.put('/replace/:id', replace);

router.patch('/update/:id', update);

module.exports = router;