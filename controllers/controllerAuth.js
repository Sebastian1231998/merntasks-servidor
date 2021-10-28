const Usuario = require("../models/usuarioModel");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.validarUsuarios = async (req, res) => {
  try {
    let { email, password } = req.body;

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    let usuario = await Usuario.findOne({ email });

    console.log(usuario)
    if (!usuario) {
      return res.status(400).json({ msg: "usuario no existe" });
    }

    let passCorrecto = await bcryptjs.compare(password, usuario.password);

    if (!passCorrecto) {
      return res.status(400).json({ msg: "password es incorrecto" });
    }

    let payload = {
      usuario: {
        id: usuario.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Hubo un error" });
  }
};

exports.obtenerUsuarios = async (req, res) => {
  try {

    let usuario = await Usuario.findById(req.usuario.id).select('-password'); 

    res.json({ usuario }); 

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "hubo un error" });
  }
};
