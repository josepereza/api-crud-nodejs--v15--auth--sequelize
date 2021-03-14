const router= require('express').Router();
const bcrypt= require('bcryptjs');
const {User}=require('../../db');
const { check, validationResult }= require('express-validator')
const moment= require('moment');
const  jwt = require('jwt-simple');

router.post('/register', [
    check('username', ' el nombre de usuario es obligatorio').not().isEmpty(),
    check('password', ' el password de usuario es obligatorio').not().isEmpty(),
    check('email', ' el email de usuario es obligatorio').isEmail()
], async(req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).json({errores: errors.array()})
    }
    req.body.password=bcrypt.hashSync(req.body.password,10)
 const nuevoUsuario= await  User.create(req.body);
 res.send(nuevoUsuario)
} );

router.post('/login', async(req,res)=>{
const user=await User.findOne({where:{email:req.body.email}});
if (user){
    const iguales=bcrypt.compareSync(req.body.password, user.password);
    if (iguales){
  res.json({sucess: createToken(user)})
    }else {res.json({error: 'Error en usuario i/o password'})

    }
}else {
    res.json({error: 'Error en usuario i/o password'})
}
})
const createToken=(user)=>{
const payload={
    usuarioId:user.id,
    createdAt:moment().unix(),
    expireAt:moment().add(5, 'minutes').unix()
}
return jwt.encode(payload, 'frase secreta');
}

module.exports=router;