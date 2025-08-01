const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const { books, total, paymentId } = req.body;
    const userId = req.user.id;

    const order = new Order({
      userId,
      books,
      total,
      paymentId,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ message: "Failed to place order" });
  }
};


exports.getRecentOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

    const orders = await Order.find({
      userId,
      createdAt: { $gte: twoDaysAgo },
    })
      .populate("books")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    res.status(500).json({ message: "Failed to fetch recent orders" });
  }
};