const router=require('express').Router();
const middlewares= require('../middlewares/checkToken');

const apiFilmsRouter=require('./api/films');
const ApiUsersRouter=require('./api/users');

router.use('/films',middlewares.checkToken, apiFilmsRouter)
router.use('/users',ApiUsersRouter)

module.exports=router;