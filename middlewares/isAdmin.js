import ErrorHandler from "../utils/errorHandler.js";

export const isAdmin = (req, res, next) => {
  console.log("🔍 Checking isAdmin middleware...");
  console.log("✅ req.user:", req.user);

  if (!req.user || !req.user.isAdmin) {
    console.log("❌ Access denied: user not admin or req.user missing");
    return next(new ErrorHandler("Access denied: Admins only", 403));
  }

  console.log("✅ Access granted: Admin verified");
  next();
};
