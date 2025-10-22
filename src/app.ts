import "dotenv/config"
import express from "express"
import cors from "cors"
import sequelize from "./config/db.config.ts"

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    sequelize
})