const Usuario = require("../models/usuarioModel");
const bcryptjs = require('bcryptjs'); 
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
 
exports.crearUsuario = async (req, res) => {
  try {

    //revisar si hay errores 
    const errores = validationResult(req)

    if(!errores.isEmpty()){

        return res.status(400).json({ errores: errores.array() })
    }


    let {password, email } = req.body; 
    let usuario = await Usuario.findOne({ email });


    if(usuario){

        return res.status(400).json({ msg: 'Usuario ya existe '});
    }

    usuario = new Usuario(req.body);

    let salt = await bcryptjs.genSalt(10)
    usuario.password = await bcryptjs.hash(password, salt)

   
    await usuario.save();

    let payload = {

        usuario:{
            id: usuario.id
        }

       
    }

    jwt.sign(payload, process.env.SECRETA, {

      expiresIn:3600

    },(error, token)=>{

        if(error) throw error; 

        res.send({ token })

    })



  } catch (error) {

    console.log("entre aqui", error);
    res.status(400).json({ msg: "Hubo un error"});

  }
};
