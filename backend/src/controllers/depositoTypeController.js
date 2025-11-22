import * as depositoTypeService from "../services/depositoTypeService.js";

/**
 * Deposito Type Controller - Handles HTTP requests for deposito type endpoints
 */

export async function getAllDepositoTypes(req, res, next) {
  try {
    const types = await depositoTypeService.getAllDepositoTypes();
    res.json(types);
  } catch (error) {
    next(error);
  }
}

export async function getDepositoTypeById(req, res, next) {
  try {
    const type = await depositoTypeService.getDepositoTypeById(req.params.id);
    if (!type) {
      return res.status(404).json({ message: "Deposito type not found" });
    }
    res.json(type);
  } catch (error) {
    next(error);
  }
}

export async function createDepositoType(req, res, next) {
  try {
    const { name, yearly_return } = req.body;
    const type = await depositoTypeService.createDepositoType(
      name,
      yearly_return
    );
    res.status(201).json(type);
  } catch (error) {
    next(error);
  }
}

export async function updateDepositoType(req, res, next) {
  try {
    const { name, yearly_return } = req.body;
    const type = await depositoTypeService.updateDepositoType(
      req.params.id,
      name,
      yearly_return
    );
    if (!type) {
      return res.status(404).json({ message: "Deposito type not found" });
    }
    res.json(type);
  } catch (error) {
    next(error);
  }
}

export async function deleteDepositoType(req, res, next) {
  try {
    const deleted = await depositoTypeService.deleteDepositoType(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Deposito type not found" });
    }
    res.json({ message: "Deposito type deleted" });
  } catch (error) {
    next(error);
  }
}
