import Request from "../models/Request.js";
import Service from "../models/Service.js";
import User from "../models/User.js";
import Document from "../models/Document.js";
import Notification from "../models/Notification.js";
import path from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
const UPLOADS_PATH = "/uploads";

// ✅ Any user: apply for a service
export async function createRequest(req, res) {
  try {
    const { service_id } = req.body;
    const service = await Service.findByPk(service_id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    const request = await Request.create({
      applicant_id: req.user.id,
      service_id,
      status: "pending",
    });

    // 🔔 notify applicant
    await Notification.create({
      user_id: req.user.id,
      title: "Request Submitted",
      message: `Your request for "${service.name}" has been submitted and is pending review.`,
    });

    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Any user: view their own requests
export async function myRequests(req, res) {
  try {
    const requests = await Request.findAll({
      where: { applicant_id: req.user.id },
      include: [{ model: Service, attributes: ["id", "name"] }],
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Officer/Dhead/Admin: list requests
export async function listRequests(req, res) {
  try {
    let filter = {};
    if (req.user.role === "dhead") {
      filter = { "$Service.department_id$": req.user.department_id };
    }

    const requests = await Request.findAll({
      where: filter,
      include: [
        { model: Service, attributes: ["id", "name", "department_id"] },
        { model: User, as: "applicant", attributes: ["id", "name", "email", "role"] },
      ],
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Officer/Dhead/Admin: update request status
export async function updateRequest(req, res) {
  try {
    const { status } = req.body;
    const request = await Request.findByPk(req.params.id, { include: [Service] });
    if (!request) return res.status(404).json({ message: "Request not found" });

    let notifyMessage = null;

    if (req.user.role === "officer") {
      if (status !== "reviewed") return res.status(403).json({ message: "Officers can only mark reviewed" });
      request.status = "reviewed";
      request.officer_id = req.user.id;
      notifyMessage = `Your request for "${request.Service.name}" has been reviewed by an officer.`;

    } else if (req.user.role === "dhead") {
      if (request.Service.department_id !== req.user.department_id)
        return res.status(403).json({ message: "Not allowed for another department" });
      if (!["approved", "rejected"].includes(status))
        return res.status(403).json({ message: "Dhead can only approve/reject" });
      request.status = status;
      request.dhead_id = req.user.id;
      notifyMessage = `Your request for "${request.Service.name}" has been ${status} by the department head.`;

    } else if (req.user.role === "admin") {
      request.status = status;
      notifyMessage = `Your request for "${request.Service.name}" has been updated by admin to status: ${status}.`;

    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await request.save();

    // 🔔 notify applicant
    if (notifyMessage) {
      await Notification.create({
        user_id: request.applicant_id,
        title: `Request ${request.status}`,
        message: notifyMessage,
      });
    }

    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Upload documents (only applicant)
export async function uploadDocuments(req, res) {
  try {
    const request = await Request.findByPk(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.applicant_id !== req.user.id) return res.status(403).json({ message: "Not your request" });

    if (!req.files || req.files.length === 0) return res.status(400).json({ message: "No files uploaded" });

    const docs = await Promise.all(
      req.files.map((file) =>
        Document.create({
          request_id: request.id,
          file_path: `${BASE_URL}${UPLOADS_PATH}/${file.filename}`,
          file_type: file.mimetype,
        })
      )
    );

    // 🔔 notify applicant
    await Notification.create({
      user_id: req.user.id,
      title: "Documents Uploaded",
      message: `You uploaded ${docs.length} document(s) for your request #${request.id}.`,
    });

    res.json({ message: "Documents uploaded", documents: docs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Get documents (applicant or reviewer)
export async function getDocuments(req, res) {
  try {
    const request = await Request.findByPk(req.params.id, { include: [{ model: Document, as: "documents" }] });
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.applicant_id === req.user.id) return res.json(request.documents);

    if (["officer", "dhead", "admin"].includes(req.user.role)) return res.json(request.documents);

    return res.status(403).json({ message: "Not authorized" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Update a document (only applicant)
export async function updateDocument(req, res) {
  try {
    const doc = await Document.findByPk(req.params.docId, { include: [Request] });
    if (!doc) return res.status(404).json({ message: "Document not found" });

    if (doc.Request.applicant_id !== req.user.id)
      return res.status(403).json({ message: "You can only update your own documents" });

    if (!req.file) return res.status(400).json({ message: "No new file uploaded" });

    doc.file_path = `${BASE_URL}${UPLOADS_PATH}/${req.file.filename}`;
    doc.file_type = req.file.mimetype;
    await doc.save();

    // 🔔 notify applicant
    await Notification.create({
      user_id: req.user.id,
      title: "Document Updated",
      message: `You updated a document for request #${doc.Request.id}.`,
    });

    res.json({ message: "Document updated", document: doc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
