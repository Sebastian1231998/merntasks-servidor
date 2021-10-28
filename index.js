
const express = require('express'); 
//crear el servidor 
const app = express(); 
const cors = require('cors');

const conectarDB = require('./config/db');


conectarDB()

const port = process.env.port || 4000;

//usar json
app.use(express.json({extended:true}))

app.use(cors());  

//importar el routing 

app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))


app.listen( port , 0.0.0.0,  ()=>{

 console.log("servidor funcionando: " + PORT)
});




