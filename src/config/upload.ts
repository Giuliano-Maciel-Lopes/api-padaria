import multer from "multer";
import path from "node:path";
import crypto from "node:crypto"
import { fileURLToPath } from "node:url";

// __filename e __dirname não existem no ES Modules, por isso precisamos criar:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");


const storage = multer.diskStorage({
    destination: TMP_FOLDER, // destino da dts
    filename:(req , file , cb)=>{

    const fileHash = crypto.randomBytes(10).toString("hex")  
    // mas para frente do projeto irei colocar o id do porduto mas por enquanto aqui ja da certo

    cb( null , ` ${fileHash}_${file.originalname}`)   

    }
    
})
export {storage , UPLOADS_FOLDER}