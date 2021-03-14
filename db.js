const Sequelize=require('sequelize');
const FilmModel=require('./models/films');
const UserModel=require('./models/users')
const sequelize=new Sequelize('apirest','root','123456',{
  host: 'localhost',
  dialect:'mysql'  
});

const Film=FilmModel(sequelize,Sequelize);
const User=UserModel(sequelize,Sequelize);

sequelize.sync({force:false}) 
.then(()=>{
    console.log('tablas sincronicdas')
})

module.exports={
    Film,
    User
}