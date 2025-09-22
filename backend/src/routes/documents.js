import express from "express";
import multer from "multer";
import {
  uploadDocumentController,
  listDocumentsController,
} from "../controllers/documentController.js";
import path from "path";

const router = express.Router();

// تنظیم مسیر ذخیره فایل‌ها
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// آپلود فایل
router.post("/", upload.single("file"), uploadDocumentController);

// مشاهده مدارک یک درخواست
router.get("/:request_id", listDocumentsController);

export default router;
