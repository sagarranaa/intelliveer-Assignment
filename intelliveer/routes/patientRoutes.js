const express = require('express');
const { getPatients ,createPatient,updatePatient} = require('../controllers/patientController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticate, authorizeRoles(['Doctor','Admin']), getPatients);
// Route to create a new patient (accessible by Admins only)
router.post('/', authenticate, authorizeRoles(['Admin']), createPatient);

// Route to update an existing patient (accessible by Admins and the patient themselves)
router.put('/:patientId', authenticate, authorizeRoles(['Admin', 'Patient']), updatePatient);

module.exports = router;
