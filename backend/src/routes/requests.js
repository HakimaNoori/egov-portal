// routes/requests.js
import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import * as requestsController from "../controllers/requestsController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Apply for a service
router.post("/", authenticate, requestsController.createRequest);

// View own requests
router.get("/my", authenticate, requestsController.myRequests);

// Officer/Dhead/Admin: list requests
router.get("/", authenticate, authorize("officer"), requestsController.listRequests);

// Officer/Dhead/Admin: update request status
router.put("/:id", authenticate, authorize("officer"), requestsController.updateRequest);

// Upload new documents
router.post("/:id/documents", authenticate, upload.array("documents", 5), requestsController.uploadDocuments);

// View documents
router.get("/:id/documents", authenticate, requestsController.getDocuments);

// Update a document (replace file)
router.put("/:id/documents/:docId", authenticate, upload.single("document"), requestsController.updateDocument);

export default router;
