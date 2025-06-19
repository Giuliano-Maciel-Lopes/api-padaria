import multer from "multer";
import path from "node:path";
import crypto from "node:crypto"
import { fileURLToPath } from "node:url";

// __filename e __dirname não existem no ES Modules, por isso precisamos criar:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const UPLOADS_FOLDER = path.resolve(__dirname, "..", "..", "public", "uploads");

const storage = multer.diskStorage({
  destination: UPLOADS_FOLDER,
  filename: (req, file, cb) => {
    const fileHash = crypto.randomBytes(10).toString("hex");
    cb(null, `${fileHash}_${file.originalname}`);
  },
});

export {storage , UPLOADS_FOLDER}