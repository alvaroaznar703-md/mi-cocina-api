import express from "express";
import cors from "cors";
import recetaRoutes from "./routes/receta.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/recetas", recetaRoutes);

export default app;
