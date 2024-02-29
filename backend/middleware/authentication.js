/* all of the JWT logic for creating and checking tokens*/
const jwt = require("jwt-simple");

// Secret for encoding and decoding JWTs
const secret = process.env.JWT_SECRET;


/**
 * create a token for a a given user id
 */
function createToken(userId) {
  return jwt.encode({ id: userId }, secret);
}


/**
 * determines if a request contains a 
 * valid token and that the user has the 
 * proper authorization to access the resource
 */
function authorizeToken(req, res, next) {
  // Check if the X-Auth header is set 
  if (!req.headers["x-auth"]) {
    res.status(401).json({error: "Missing X-Auth header"});
    return false;
  }

  // X-Auth should contain the token value
  const token = req.headers["x-auth"];

  // Decode the token to get the user id
  try {
    jwt.decode(token, secret);
  } catch (err) {
    res.status(401).json({error: "Invalid token"});
    return false;
  }
  const decoded = jwt.decode(token, secret);

  // If the user id is "me", replace it with the actual user id
  if (req.userId && req.userId === "me") {
    req.userId = decoded.id;
  }
  
  // If the user id in the token does not match the user id in the request
  if (req.userId && (req.userId != decoded.id)) {
    res.status(403).json({error: "Forbidden"});
    return false;
  }

  return true;
}

module.exports = {authorizeToken, createToken};