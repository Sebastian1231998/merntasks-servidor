
const express = require('express'); 
//crear el servidor 
const app = express(); 
const cors = require('cors');

const conectarDB = require('./config/db');


conectarDB(); 



app.use(cors())
//usar json
app.use(express.json({extended:true}))


//importar el routing 



app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))


app.listen( process.env.PORT  || 4000 , '0.0.0.0' ,  ()=>{

 console.log("servidor funcionando: " + process.env.PORT  || 4000)
});




