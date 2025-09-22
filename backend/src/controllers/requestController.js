import {
  createRequest,
  getRequests,
  updateRequestStatus,
} from "../models/Request.js";

export const createRequestController = async (req, res) => {
  try {
    const { user_id, service_id } = req.body;
    const request = await createRequest({ user_id, service_id });
    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const listRequestsController = async (req, res) => {
  try {
    const requests = await getRequests();
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const approveRequestController = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await updateRequestStatus(id, "Approved");
    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const rejectRequestController = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await updateRequestStatus(id, "Rejected");
    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
