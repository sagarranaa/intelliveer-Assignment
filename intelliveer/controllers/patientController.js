const User = require('../models/User');
const Patient = require('../models/Patient');
const getPatients = async (req, res) => {
  try {
    let query = {};

    // Check role-based access:
    if (req.user.role === 'Doctor') {
      query.doctor = req.user._id;
    } else if (req.user.role === 'Patient') {
      query._id = req.user._id;
    }
    const patients = await Patient.find(query);
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPatient = async (req, res) => {
  const { name, age, contactInfo, doctorId } = req.body;

  try {
    // Ensure that the doctorId is valid and the doctor exists
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'Doctor') {
      return res.status(400).json({ message: 'Invalid doctor ID or doctor role' });
    }

    // Create the new patient record
    const patient = new Patient({
      name,
      age,
      contactInfo,
      doctor: doctorId, 
    });

    // Save the patient record to the database
    await patient.save();
    res.status(201).json(patient);  
  } catch (err) {
    res.status(400).json({ error: err.message });  
  }
};



const updatePatient = async (req, res) => {
  try {
    if (req.user.role !== 'Admin' && req.user._id !== req.params.patientId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.patientId,
      req.body,
      { new: true }
    );
    
    res.json(updatedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports = { getPatients,createPatient,updatePatient };
