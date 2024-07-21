import ApiError from "../utils/ApiError.js";

function globalErrorMiddleware(err, req, res, next) {
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    message: err.message,
    error: err,
    stack: err.stack,
  });
}

function notFoundMiddleware(req, res, next) {
  const error = new ApiError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
}

export { globalErrorMiddleware, notFoundMiddleware };
