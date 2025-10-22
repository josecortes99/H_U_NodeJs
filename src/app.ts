import "dotenv/config";
import express from "express";
import { corsMiddleware } from "./middlewares/cors.middleware.ts";
import { responseTimeMiddleware } from "./middlewares/responseTime.middleware.ts";
import sequelize from "./config/db.config.ts";
import { initRoutes, router } from "./routes/index.ts";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsMiddleware);
app.use(express.json());
app.use(responseTimeMiddleware);

await initRoutes();
app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  sequelize;
});
