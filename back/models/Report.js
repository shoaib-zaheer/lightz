const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reportSchema = new Schema({
  
  answer: {
    type: Boolean,
    required: true,
  },
  cityName: {
    type: String,
    required: true,
  },
  stateName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }


}, { timestamps: true })

const Report = mongoose.model('Report', reportSchema)
module.exports = Report
