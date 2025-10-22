import "dotenv/config"
import { Sequelize } from "sequelize";

const sequelize = new Sequelize (
    process.env.DB_NAME || "test",
    process.env.DB_USER || "postgres",
    process.env.DB_PASS || "123456",
    {
        host: "localhost",
        dialect: "postgres",
        port: 5433,
        logging: false,
    }
);

(async () => {
    try {
        await sequelize.authenticate()
        console.log("Exito al conectar base de datos");
    } catch (error) {
        console.log("Error al conectar base de datos", error);
    }
})();

export default sequelize;
