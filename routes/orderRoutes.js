const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const { placeOrder } = require("../controllers/orderController");
const { getRecentOrders } = require("../controllers/orderController");

router.post("/", verifyToken, placeOrder);
router.get("/recent", verifyToken, getRecentOrders);

module.exports = router;
