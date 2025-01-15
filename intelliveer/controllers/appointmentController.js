const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient'); 
const User = require('../models/User'); 

// const getAppointments = async (req, res) => {
//     try {
//       // If user is a patient, show only their appointments
//       const appointments = await Appointment.find({ patient: req.user._id })
//         .populate('patient doctor');
      
//       res.json(appointments);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };

const getAppointments = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'Patient') {
      query.patient = req.user._id;
    } else if (req.user.role === 'Doctor') {
      query.doctor = req.user._id;
    } // Admins can view all appointments

    const appointments = await Appointment.find(query)
      .populate('patient', 'name')
      .populate('doctor', 'name');

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  
  const createAppointment = async (req, res) => {
    const { doctor, date, status } = req.body;
  
    try {
      const appointment = new Appointment({
        patient: req.user._id,  
        doctor,
        date,
        status: status || 'Scheduled',
      });
      await appointment.save();
      res.status(201).json(appointment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Update appointment status (only for patients' own appointments)
  const updateAppointmentStatus = async (req, res) => {
    const { appointmentId, status } = req.body;
  
    try {
      let query = { _id: appointmentId };
  
      // Role-based access control for updating status
      if (req.user.role === 'Patient') {
        query.patient = req.user._id; 
      } else if (req.user.role === 'Doctor') {
        query.doctor = req.user._id; 
      } else {
        return res.status(403).json({ message: 'Access denied' }); 
      }
  
      const appointment = await Appointment.findOneAndUpdate(
        query,
        { status },
        { new: true } 
      );
  
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found or access denied' });
      }
  
      res.json(appointment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const deleteAppointment = async (req, res) => {
    const { appointmentId } = req.body;
  
    try {
      let query = { _id: appointmentId };
  
      // Role-based access control
      if (req.user.role === 'Patient') {
        query.patient = req.user._id; 
      } else if (req.user.role === 'Admin') {
        // Admin can delete any appointment, so no additional query filter needed
      } else {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      const appointment = await Appointment.findOneAndDelete(query);
  
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found or access denied' });
      }
  
      res.json({ message: 'Appointment deleted successfully', appointment });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
  

module.exports = { getAppointments, createAppointment, updateAppointmentStatus,deleteAppointment };
