const express=require('express');
const app=express();
const apiRouter=require('./routes/api');
const cors=require('cors');
require('./db');

const bodyParser=require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.send('hola mundo')
})
app.use('/api', apiRouter)
app.listen(3000,()=>{
    console.log('Servidor funcionando')
})