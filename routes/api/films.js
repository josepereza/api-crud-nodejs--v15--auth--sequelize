const router=require('express').Router();
const {Film}=require('../../db')


router.get('/', async(req,res)=>{
    const films=await Film.findAll();
   
        res.json(films);
    
})
// CON PROMESA
// router.post('/',(req,res)=>{
//     const film=  Film.create(req.body);
//     film.then(data=>{
//         res.json(data)
//     })
    
    
// })

router.post('/',async(req,res)=>{
    const film= await Film.create(req.body);
    
        res.json(film)
            
})

router.put('/:filmId', async (req,res)=>{
    await Film.update(req.body,{
        where:{id:  req.params.filmId}
    });
    res.json({sucess: 'el archivo se ha modificado'})
})

router.delete('/:filmId', async (req,res)=>{
    await Film.destroy({
        where: {id: req.params.filmId}
    })
    res.json({sucess:'registro borrado'})
})
module.exports=router;