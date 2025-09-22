import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";
const absUpload = path.join(__dirname, "..", "..", UPLOAD_DIR);

if (!fs.existsSync(absUpload)) fs.mkdirSync(absUpload, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, absUpload),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /pdf|jpg|jpeg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error("File type not allowed"));
};

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter,
});
