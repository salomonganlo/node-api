const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decodedToken = jwt.verify(token, "MA_CLE_SECRET")
    const userId = decodedToken.userId

    //Making the userId available to all endpoint
    req.auth = { userId }

    if (req.body.userId && req.body.userId !== userId) {
      throw "Something wrong"
    } else {
      next()
    }
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid Request")
    })
  }
}
