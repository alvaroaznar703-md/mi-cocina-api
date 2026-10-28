import express from "express";
import {getRecetas, getRecetaDetalle, postReceta, deleteReceta } from "../controllers/receta.controller.js";

const router = express.Router();

router.get("/", getRecetas);
router.get("/:id", getRecetaDetalle);
router.post("/", postReceta);
router.delete("/:id", deleteReceta);

export default router;