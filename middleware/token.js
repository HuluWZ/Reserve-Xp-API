const { verify } = require("jsonwebtoken");
const SuperAdmin = require("../models/adminModels");
const Tenant = require("../tenant/tenant");

const validateSuperAdminToken = async(req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.json({ error: "Authentication header is not provided" });
  }
  const accessToken = header.split("Bearer ")[1];
  if (!accessToken) {
    return res.json({ error: "Authentication Tokens are not provided" });
  } else {
    try {
      const validToken = verify(accessToken, process.env.JWT_SECRET_KEY);
      const userInfo = await SuperAdmin.findById(validToken.user_id);
      if (userInfo) {
        req.user = userInfo ;
        return next();
      } else {
       return res.status(403).json({ error: err.name,message:"You are not authorized to access" });
      }
    } catch (err) {
      return res.status(403).json({ error: err.name,message:"You are not authorized to access" });
    }
  }
};

const validateAdminToken = async(req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.json({ error: "Authentication header is not provided" });
  }
  const accessToken = header.split("Bearer ")[1];
  if (!accessToken) {
    return res.json({ error: "Authentication Tokens are not provided" });
  } else {
    try {
      const validToken = verify(accessToken, process.env.JWT_SECRET_KEY);
      const userInfo = await Tenant.findById(validToken.user_id);
      if (userInfo) {
        req.user = userInfo ;
        return next();
      } else {
       return res.status(403).json({ error: err.name,message:"You are not authorized to access" });
      }
    } catch (err) {
      return res.status(403).json({ error: err.name,message:"You are not authorized to access" });
    }
  }
};

module.exports = { validateSuperAdminToken,validateAdminToken };