const Proyecto = require("../models/proyectoModel");
const { validationResult } = require("express-validator");

exports.crearProyecto = async (req, res) => {
  try {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    let proyecto;

    proyecto = new Proyecto(req.body);

    proyecto.creador = req.usuario.id;
    await proyecto.save();

    res.status(200).json({  proyecto });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.obtenerProyectos = async (req, res) => {
  try {
    console.log(req.usuario.id)
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1,
    });

    res.json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.actualizarProyectos = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { nombre } = req.body;

  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    let proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no existe" });
    }
    //verificar el creador

    if (proyecto.creado.toString() !== req.usuario.id) {
      return res.status(404).json({ msg: "Token no valido" });
    }

    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.eliminarProyecto = async (req, res) => {
  try {

    let proyecto = await Proyecto.findById(req.params.id);


    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no existe" });
    }
    //verificar el creador

    console.log(proyecto.creador.toString() !== req.usuario.id)
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(404).json({ msg: "Token no valido" });
    }


    await Proyecto.findOneAndRemove({_id:req.params.id})

    res.status(200).json({ msg: "Proyecto se ha eliminado correctamente" });

  } catch (error) {
    console.log("Hay un error" + error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
