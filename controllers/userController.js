const UserModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new UserModel({
      email: req.body.email,
      password: hash
    })
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: "Created Successfully!"
        })
      })
      .catch((error) => {
        res.status(500).json({ error })
      })
  })
}
exports.login = (req, res, next) => {
  UserModel.findOne({
    email: req.body.email
  })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "User doen't exist" })
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              message: "Incorrect Password"
            })
          }
          const token = jwt.sign(
            { userId: user._id },
            "MA_CLE_SECRET",
            {
              expiresIn: "24h"
            }
          )
          res.status(200).json({
            token,
            userId: user._id
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}
