
const express = require('express'); 
//crear el servidor 
const app = express(); 
const cors = require('cors');

const conectarDB = require('./config/db');


conectarDB()

const port = process.env.port || 4000;

//usar json
app.use(express.json({extended:true}))

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

app.use(cors(corsOptions));  

//importar el routing 

app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))


app.listen( port , '0.0.0.0' ,  ()=>{

 console.log("servidor funcionando: " + port)
});




