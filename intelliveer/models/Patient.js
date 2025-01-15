const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  contactInfo: { type: String, required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);
