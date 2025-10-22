import { Router } from "express";
import { readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PATH_ROUTER = join(__dirname)

const router: Router = Router()

const cleanFileName = (fileName: string) => {
    return fileName.split(".").shift();
}

export async function initRoutes() {
    for ( let fileName of readdirSync(PATH_ROUTER)) {
        const cleanName = cleanFileName(fileName)
        if ( cleanName !== "index") {
            try {
                const moduleRouter = await import(`./${cleanName}.route.ts`)
                if (moduleRouter.router) {
                    router.use(`/${cleanName}`, moduleRouter.router) 
                } else {
                    console.warn("Warning");
                }
            } catch (error) {
                console.log("Error", error);   
            }
        }
    }
}

export { router }
