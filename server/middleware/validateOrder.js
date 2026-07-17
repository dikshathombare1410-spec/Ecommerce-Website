// Lightweight validation middleware — no extra npm package required.

// Validate Add to Cart
export const validateAddToCart = (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "productId is required",
    });
  }

  if (quantity !== undefined && (isNaN(quantity) || quantity < 1)) {
    return res.status(400).json({
      success: false,
      message: "quantity must be a number >= 1",
    });
  }

  next();
};

// Validate Create Order
export const validateCreateOrder = (req, res, next) => {
  const { shippingAddress, paymentMethod } = req.body;

  if (!shippingAddress) {
    return res.status(400).json({
      success: false,
      message: "shippingAddress is required",
    });
  }

  const requiredFields = [
    "fullName",
    "address",
    "city",
    "state",
    "postalCode",
    "country",
    "phone",
  ];

  const missing = requiredFields.filter(
    (field) => !shippingAddress[field]
  );

  if (missing.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing shippingAddress fields: ${missing.join(", ")}`,
    });
  }

  const allowedMethods = ["COD", "CARD", "UPI", "NETBANKING"];

  if (paymentMethod && !allowedMethods.includes(paymentMethod)) {
    return res.status(400).json({
      success: false,
      message: `paymentMethod must be one of: ${allowedMethods.join(", ")}`,
    });
  }

  next();
};

// Validate Order Status
export const validateOrderStatus = (req, res, next) => {
  const { status } = req.body;

  const allowedStatuses = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  if (!status || !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `status must be one of: ${allowedStatuses.join(", ")}`,
    });
  }

  next();
};