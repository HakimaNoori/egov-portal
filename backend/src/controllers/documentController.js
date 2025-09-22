import { uploadDocument, getDocumentsByRequest } from "../models/Document.js";

// آپلود یک مدرک
export const uploadDocumentController = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const { request_id } = req.body;
    if (!request_id) {
      return res.status(400).json({ message: "request_id is required" });
    }

    // فقط file_path داریم توی دیتابیس
    const file_path = `/uploads/${req.file.filename}`;

    const document = await uploadDocument({ request_id, file_path });
    res.status(201).json(document);
  } catch (error) {
    console.error("Error in uploadDocumentController:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// مشاهده مدارک یک درخواست
export const listDocumentsController = async (req, res) => {
  try {
    const { request_id } = req.params;
    const documents = await getDocumentsByRequest(request_id);
    res.json(documents);
  } catch (error) {
    console.error("Error in listDocumentsController:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
