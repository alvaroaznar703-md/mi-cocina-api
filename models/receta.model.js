import pool from "../db/conexion.js";

export const obtenerRecetas = async () => {
  try {
    const [rows] = await pool.execute(`
      SELECT id, nombre, imagen, tiempo_minutos
      FROM recetas
    `);

    console.log("Recetas encontradas:", rows.length);

    return rows;
  } catch (error) {
    console.error("Error en obtenerRecetas:", error);
    throw error;
  }
};



export const obtenerRecetaDetalle = async (id) => {

    const [rows] = await pool.execute(`
        SELECT
            r.id,
            r.nombre,
            r.descripcion,
            r.imagen,
            r.tiempo_minutos,
            i.id AS ingrediente_id,
            i.nombre AS ingrediente_nombre
        FROM recetas r
        INNER JOIN recetas_ingredientes ri
            ON r.id = ri.recetas_id
        INNER JOIN ingredientes i
            ON ri.ingredientes_id = i.id
        WHERE r.id = ?
    `, [id]);

    if (rows.length === 0) {
        return null;
    }

    const receta = {
        id: rows[0].id,
        nombre: rows[0].nombre,
        descripcion: rows[0].descripcion,
        imagen: rows[0].imagen,
        tiempo_minutos: rows[0].tiempo_minutos,
        ingredientes: rows.map(row => ({
            id: row.ingrediente_id,
            nombre: row.ingrediente_nombre
        }))
    };

    return receta;
};

export const crearReceta = async (
    nombre,
    descripcion,
    imagen,
    tiempo_minutos
) => {

    const [result] = await pool.execute(
        `INSERT INTO recetas
        (nombre, descripcion, imagen, tiempo_minutos)
        VALUES (?, ?, ?, ?)`,
        [nombre, descripcion, imagen, tiempo_minutos]
    );

    return result;
};


export const eliminarReceta = async (id) => {
  await pool.execute(
    "DELETE FROM recetas_ingredientes WHERE recetas_id = ?",
    [id]
  );

  const [result] = await pool.execute(
    "DELETE FROM recetas WHERE id = ?",
    [id]
  );

  return result;
};