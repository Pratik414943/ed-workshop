const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  value: { type: String, required: true },
  pdfFile: { type: String },
});

const Resource = mongoose.model('Option', resourceSchema);

module.exports = Resource;
