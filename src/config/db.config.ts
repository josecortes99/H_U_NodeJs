import "dotenv/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME || "historia_usuario",
    process.env.DB_USER || "postgres",
    process.env.DB_PASS || "Atope199*",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        port: Number(process.env.DB_PORT) || 5432,
        logging: false,
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Exito al conectar base de datos");
    } catch (error) {
        console.log("Error al conectar base de datos", error);
    }
})();

export default sequelize;
