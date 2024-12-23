// middleware/authMiddleware.js
module.exports.validateHeader = (req, res, next) => {
  const userId = req.headers["authorization"];

  if (!userId) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  // Example: You can validate the user ID against a list of known valid IDs
  const validUserIds = ["12345", "67890"]; // Example list

  if (!validUserIds.includes(userId)) {
    return res
      .status(403)
      .json({ message: "Invalid Authorization header value" });
  }

  // If valid, proceed to the next middleware or route handler
  next();
};
