const express = require('express'); 
const router = express.Router(); 
const usuarioController = require('../controllers/controllerUsuarios')
const { check } = require('express-validator')


router.post('/',
[
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('email','Agrega un emil un valido').isEmail(),
    check('password','El password debe ser minimo de 6 caracteres').isLength(6)
    

]
, usuarioController.crearUsuario );

module.exports = router; 


