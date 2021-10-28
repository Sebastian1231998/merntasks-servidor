const express = require('express'); 
const router = express.Router(); 
const { check } = require('express-validator')
const authController = require('../controllers/controllerAuth');
const authMiddlewareToken = require('../middleware/authMiddleware')



router.get('/', authMiddlewareToken , authController.obtenerUsuarios );
router.post('/', authController.validarUsuarios );

module.exports = router; 
