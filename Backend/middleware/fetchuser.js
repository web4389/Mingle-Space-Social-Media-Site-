const jwt = require("jsonwebtoken");
const jwt_secret = "shilok434@#$@";

const fetchuser = (req, res, next) => {
  let success = false;
  // Getting Token From Header
  const token = req.header("token");
  if (!token) {
    res
      .status(401)
      .json({ message: "Plz Authenticate With Valid Token", success });
  }
  // Verifying the token and setting it into the body
  else {
    const data = jwt.verify(token, jwt_secret);
    req.user = data.user;
    next();
  }
};

module.exports = fetchuser;
