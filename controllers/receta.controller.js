import {
  obtenerRecetas,
  obtenerRecetaDetalle,
  crearReceta,
  eliminarReceta,
} from "../models/receta.model.js";

export const getRecetas = async (req, res) => {
  try {
    const recetas = await obtenerRecetas();
    return res.json(recetas);
  } catch (error) {
    console.error("Error al obtener las recetas:", error);

    return res.status(500).json({
      mensaje: "Error al obtener las recetas",
    });
  }
};

export const getRecetaDetalle = async (req, res) => {
  try {
    const { id } = req.params;

    const receta = await obtenerRecetaDetalle(id);

    if (!receta) {
      return res.status(404).json({
        mensaje: "Receta no encontrada",
      });
    }

    return res.json(receta);
  } catch (error) {
    console.error("Error al obtener el detalle:", error);

    return res.status(500).json({
      mensaje: "Error al obtener el detalle de la receta",
    });
  }
};

export const postReceta = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      imagen,
      tiempo_minutos,
    } = req.body;

    const resultado = await crearReceta(
      nombre,
      descripcion,
      imagen,
      tiempo_minutos
    );

    return res.status(201).json({
      mensaje: "Receta creada correctamente",
      id: resultado.insertId,
    });
  } catch (error) {
    console.error("Error al crear la receta:", error);

    return res.status(500).json({
      mensaje: "Error al crear la receta",
    });
  }
};

export const deleteReceta = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await eliminarReceta(id);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: "Receta no encontrada",
      });
    }

    return res.json({
      mensaje: "Receta eliminada correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar la receta:", error);

    return res.status(500).json({
      mensaje: "Error al eliminar la receta",
    });
  }
};
