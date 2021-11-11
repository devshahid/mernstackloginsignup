const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const Authenticate = async (req, res, next) => {
  try {
    // fetching token from browser named jwtToken
    const token = req.cookies.jwtToken;
    const veifyToken = jwt.verify(token, process.env.SECRETKEY);
    const rootUser = await User.findOne({
      _id: veifyToken._id,
      mytokens: token,
    });
    req.token = token;
    req.rootUser = rootUser;
    next();
  } catch (err) {
    res.status(401).send({ message: "Unauthorized Token", status: "422" });
  }
};
module.exports = Authenticate;
