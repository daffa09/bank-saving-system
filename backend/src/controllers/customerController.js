import * as customerService from "../services/customerService.js";

/**
 * Customer Controller - Handles HTTP requests for customer endpoints
 */

export async function getAllCustomers(req, res, next) {
  try {
    const customers = await customerService.getAllCustomers();
    res.json(customers);
  } catch (error) {
    next(error);
  }
}

export async function getCustomerById(req, res, next) {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    next(error);
  }
}

export async function createCustomer(req, res, next) {
  try {
    const { name } = req.body;
    const customer = await customerService.createCustomer(name);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
}

export async function updateCustomer(req, res, next) {
  try {
    const { name } = req.body;
    const customer = await customerService.updateCustomer(req.params.id, name);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    next(error);
  }
}

export async function deleteCustomer(req, res, next) {
  try {
    const deleted = await customerService.deleteCustomer(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json({ message: "Customer deleted" });
  } catch (error) {
    next(error);
  }
}
