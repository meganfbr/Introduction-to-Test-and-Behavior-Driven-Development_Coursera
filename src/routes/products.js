const express = require("express");
const router = express.Router();
const model = require("../models/products");

// Create (Not explicitly in the snippet requirement but necessary)
router.post("/products", (req, res) => {
  const product = model.create(req.body);
  res.status(201).json(product);
});

// Read single product
router.get("/products/:id", (req, res) => {
  const product = model.read(req.params.id);
  if (!product) return res.status(404).send();
  res.json(product);
});

// Update a product
router.put("/products/:id", (req, res) => {
  const product = model.update(req.params.id, req.body);
  if (!product) return res.status(404).send();
  res.json(product);
});

// Delete a product
router.delete("/products/:id", (req, res) => {
  model.remove(req.params.id);
  res.status(204).send();
});

// List All / List by Name / List by Category / List by Availability
router.get("/products", (req, res) => {
  const { name, category, available } = req.query;
  let data = model.list();

  if (name) {
    data = model.findByName(name);
  } else if (category) {
    data = model.findByCategory(category);
  } else if (available !== undefined) {
    data = model.findByAvailability(available === "true");
  }

  res.json(data);
});

module.exports = router;