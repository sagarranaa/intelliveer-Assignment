const express = require('express');
const { getAppointments, createAppointment,updateAppointmentStatus,deleteAppointment  } = require('../controllers/appointmentController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get appointments for a Doctor (Doctor-specific)
router.get('/', authenticate, authorizeRoles(['Doctor','Admin']), getAppointments);

// Route to create a new appointment (Patient-specific)
router.post('/', authenticate, authorizeRoles(['Patient']), createAppointment);

// Route to update appointment status (optional)
router.put('/status', authenticate, authorizeRoles(['Doctor']), updateAppointmentStatus);
// Route to delete an appointment (Patient or Admin-specific)
router.delete('/', authenticate, authorizeRoles(['Patient', 'Admin']), deleteAppointment);



module.exports = router;