const Thing = require("../models/thing")
const fs = require("fs")

exports.createStuff = (req, res, next) => {
  req.body.thing = JSON.parse(req.body.thing)
  const url = req.protocol + "://" + req.get("host")

  const thing = new Thing({
    title: req.body.thing.title,
    description: req.body.thing.description,
    imageUrl: url + "/images/" + req.file.filename,
    price: req.body.thing.price,
    userId: req.body.thing.userId
  })

  thing
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post Saved Successfully"
      })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
}

exports.updateStuff = (req, res, next) => {
  let thing = new Thing({
    _id: req.params.id
  })
  if (req.file) {
    req.body.thing = JSON.parse(req.body.thing)
    const url = req.protocol + "://" + req.get("host")
    thing = {
      _id: req.params.id,
      title: req.body.thing.title,
      description: req.body.thing.description,
      imageUrl: url + "/images/" + req.file.filename,
      price: req.body.thing.price,
      userId: req.body.thing.userId
    }
  } else {
    thing = {
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    }
  }

  Thing.updateOne({ _id: req.params.id }, thing)
    .then(() => {
      res.status(200).json({
        message: "Thing updated Successfuly!"
      })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
}

exports.deleteOneStuff = (req, res, next) => {
  Thing.findOne({
    _id: req.auth.userId
  }).then((thing) => {
    if (!thing) {
      return res.status(404).json({
        error: new Error("doesn't exit")
      })
    }
    if (thing.userId !== req.auth.userId) {
      return res.status(401).json({
        error: "Unauthorized request"
      })
    }
    const filename = thing.imageUrl.split("/images/")[1]
    fs.unlink("images/" + filename, () => {
      Thing.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(204).json({
            message: "Deleted"
          })
        })
        .catch((error) => {
          res.status(400).json({ error })
        })
    })
  })
}

exports.getOneStuff = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  })
    .then((thing) => {
      res.status(200).json(thing)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
}

exports.getAllStuff = (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
}
