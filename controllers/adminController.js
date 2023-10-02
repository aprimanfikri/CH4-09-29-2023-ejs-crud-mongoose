const fs = require("fs")
const Tour = require("../models/tourModel")

const createTour = async (req, res) => {
  try {
    await Tour.create(req.body)
    res.redirect("/dashboard")
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const getAllTours = async (req, res) => {
  try {
    const { price, name } = req.query
    const condition = {}
    if (price) {
      condition.price = { $gt: req.query.price }
    }
    if (name) {
      condition.name = {
        $regex: ".*" + name + ".*",
        $options: "i",
      }
    }
    console.log(condition)
    const tours = await Tour.find().where(
      condition
    )
    res.render("tours/index", { tours })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}
const createPage = async (req, res) => {
  try {
    res.render("tours/create")
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(
      req.params.id
    )

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "success",
      message: err.message,
    })
  }
}

const editTour = async (req, res) => {
  try {
    const id = req.params.id

    const tour = await Tour.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    )

    res.status(201).json({
      status: "success",
      data: {
        tour: tour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const removeTour = async (req, res) => {
  try {
    const id = req.params.id

    const tour = await Tour.findByIdAndRemove(id)

    // validator
    if (!tour) {
      return res.status(400).json({
        status: "failed",
        message:
          "data with this id is not define",
      })
    }

    res.status(201).json({
      status: "success",
      message: "data sudah berhasil di hapus",
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  editTour,
  removeTour,
  createPage,
}
