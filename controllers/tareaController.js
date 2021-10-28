const Tarea = require("../models/tareaModel");
const Proyecto = require("../models/proyectoModel");
const { validationResult } = require("express-validator");

exports.crearTarea = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(404).json({ msg: errores.array() });
  }
  const { proyecto } = req.body;


  try {
    const proyectoExiste = await Proyecto.findById(proyecto);

    if (!proyectoExiste) {
      return res.status(404).json({ msg: "El proyecto no existe " });
    }

    if (proyectoExiste.creador.toString() !== req.usuario.id) {
      return res.status(404).json({ msg: "Permiso no valido" });
    }

    const tarea = new Tarea(req.body);
    await tarea.save();
    res.status(200).json({ tarea });
  } catch (error) {
    console.log(error);

    res.json({ msg: error });
  }
};

exports.obtenerTareas = async (req, res) => {
  const { proyecto } = req.query;


  try {
    const proyectoExiste = await Proyecto.findById(proyecto);

    if (!proyectoExiste) {
      return res.status(404).json({ msg: "El proyecto no existe " });
    }

    if (proyectoExiste.creador.toString() !== req.usuario.id) {
      return res.status(404).json({ msg: "Permiso no valido" });
    }

    const tarea = await Tarea.find({ proyecto });

    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

exports.actualizarTarea = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(404).json({ msg: errores.array() });
  }

  let { nombre, estado } = req.body;

  let nuevaTarea = {};

  try {
    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ msg: "No existe la tarea" });
    }

    if (nombre) {
      nuevaTarea.nombre = nombre;
    }
    if (estado) {
      nuevaTarea.estado = estado;
    }

    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });

    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ msg: "La tarea no existe" });
    }

   await Tarea.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Se ha eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "hubo un error" });
  }
};
