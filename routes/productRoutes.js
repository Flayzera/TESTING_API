const express = require("express");
const ProductController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/", ProductController.findAll);
router.get("/:id", ProductController.findById);
router.post("/", [authMiddleware, adminMiddleware], ProductController.create);
router.put("/:id", [authMiddleware, adminMiddleware], ProductController.update);
router.delete("/:id", [authMiddleware, adminMiddleware], ProductController.delete);

module.exports = router;
