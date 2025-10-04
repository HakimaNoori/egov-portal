// controllers/servicesController.js
import Service from "../models/Service.js";
import Department from "../models/Department.js";

// Create service (admin only)
export async function createService(req, res) {
  try {
    const { department_id, name, description, fee } = req.body;
    const dept = await Department.findByPk(department_id);
    if (!dept) return res.status(404).json({ message: "Department not found" });

    const service = await Service.create({ department_id, name, description, fee });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// List all services (all authenticated users)
export async function listServices(req, res) {
  try {
    const services = await Service.findAll({
      include: [{ model: Department, attributes: ["id", "name"] }],
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get a single service
export async function getService(req, res) {
  try {
    const service = await Service.findByPk(req.params.id, {
      include: [{ model: Department, attributes: ["id", "name"] }],
    });
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update service (admin only)
export async function updateService(req, res) {
  try {
    const { name, description, fee, department_id } = req.body;
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    if (department_id) {
      const dept = await Department.findByPk(department_id);
      if (!dept) return res.status(404).json({ message: "Department not found" });
      service.department_id = department_id;
    }

    service.name = name ?? service.name;
    service.description = description ?? service.description;
    service.fee = fee ?? service.fee;

    await service.save();
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete service (admin only)
export async function deleteService(req, res) {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    await service.destroy();
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
