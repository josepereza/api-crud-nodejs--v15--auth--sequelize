const jwt= require('jwt-simple');
const moment= require('moment');
const checkToken=(req,res,next)=>{
    if (!req.headers['user-token']){
        return res.json({error: 'Necesitas incluir el user-token en cabecera'});
    }
    const userToken=req.headers['user-token'];
    let payload={};

    try {
payload=jwt.decode(userToken, 'frase secreta');


    }catch(err){
        return res.json({error: 'Necesitas incluir el user-token correcto'})
    }
    if (payload.expireAt < moment().unix()){
        return res.json({error:'el token ha expirado, payaso'});
    }
    req.usuarioId=payload.usuarioId;
    next();
}
module.exports={
    checkToken:checkToken
}