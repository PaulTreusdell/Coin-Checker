import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    //check if token exists
    if (!token) {
      return res.status(403).send("Denied");
    }
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    //travel to next middleware
    next()
  }
  catch (e) {
    console.error(`Error logging in ${e}`)
    res.status(401).send({message: "Invalid token"})
  }
}