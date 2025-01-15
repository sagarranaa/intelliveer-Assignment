const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes); 
app.use('/api/appointments', appointmentRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
