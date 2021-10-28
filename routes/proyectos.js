const express = require('express'); 
const router = express.Router(); 
const authMiddlewareToken = require('../middleware/authMiddleware')
const proyectoController = require('../controllers/proyectoController')
const {check } = require('express-validator')

router.post('/' 
,authMiddlewareToken 
, proyectoController.crearProyecto )

router.get('/' 
,authMiddlewareToken 
, proyectoController.obtenerProyectos )

router.put('/:id' 
,authMiddlewareToken 
, proyectoController.actualizarProyectos )

router.delete('/:id' 
,authMiddlewareToken 
, proyectoController.eliminarProyecto )


module.exports = router;