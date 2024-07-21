import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const payload = { id: userId };
  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // to work on https only
    sameSite: "strict", // to prevent CSRF attacks
    maxAge: parseInt(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000, // in milliseconds
  });
};

export { generateToken };
