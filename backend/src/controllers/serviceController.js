import { createService, getServices } from "../models/Service.js";

export const createServiceController = async (req, res) => {
  try {
    const service = await createService(req.body);
    res.status(201).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const listServicesController = async (req, res) => {
  try {
    const services = await getServices();
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
