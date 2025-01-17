# Appointment Management API

This API is designed for managing appointments within a healthcare system. It supports Patients, Doctors, and Admins with role-based access control for scheduling, viewing, updating, and deleting appointments.

# Postman collection api link

https://grey-escape-471381.postman.co/workspace/Gmail-%2F-Intelliveer-Workspace~d480b54a-752d-4a1d-9545-076fcc7f1081/collection/11843103-ceff9b8d-4ac8-481a-84ff-33b83d3db900?action=share&creator=11843103

## Features
- **Role-Based Access Control**:
  - **Patients** can schedule, view, update, and delete their own appointments.
  - **Doctors** can view and update the status of their assigned appointments.
  - **Admins** can manage all appointments.
- **Authentication & Authorization**:
  - All endpoints are secured and require a valid JWT token.
- **CRUD Operations**:
  - Create, read, update, and delete appointments.

---

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/appointment-api.git
   cd appointment-api

2. **Install Dependencies**:
    Install Dependencies
     npm install

3.Environment Variables: Create a .env file in the root directory with the following:
    -- PORT=5000
    -- MONGO_URI=<your-mongodb-uri>
    -- JWT_SECRET=<your-secret-key>

4.Start the Server:
    npm start

## Authentication & Authorization
JWT Token:
All requests require an Authorization header with a valid Bearer <token> token.
Tokens are issued upon successful login.

API Endpoints
1. Register User
POST /api/auth/register

Roles: Patient, Doctor, Admin
Body:
json
Copy code
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "Patient"  
}

2. Login User
POST /api/auth/login

Roles: Patient, Doctor, Admin
Body:
json
Copy code
{
  "email": "john.doe@example.com",
  "password": "password123"
}

3. Get Appointments
GET /api/appointments

Roles: Doctor, Admin, Patient
Headers:
Authorization: Bearer <token>
Description:
Fetch all appointments:

For Admin: All appointments.
For Doctor: Appointments assigned to the logged-in doctor.
For Patient: Appointments belonging to the logged-in patient.
Example Response:

json
Copy code
[
  {
    "_id": "67874f81813a4e3102116bfc",
    "patient": { "name": "John Doe" },
    "doctor": { "name": "Dr. Smith" },
    "date": "2025-01-20T10:00:00Z",
    "status": "Scheduled"
  }
]

4. Create Appointment
POST /api/appointments

Roles: Patient
Headers:
Authorization: Bearer <token>
Body:
json
Copy code
{
  "doctor": "d456",
  "date": "2025-01-20T10:00:00Z",
  "status": "Scheduled"
}

5. Update Appointment Status
PUT /api/appointments/status

Roles: Doctor
Headers:
Authorization: Bearer <token>
Body:
json
Copy code
{
  "appointmentId": "67874f81813a4e3102116bfc",
  "status": "Completed"
}

6. Delete Appointment
DELETE /api/appointments

Roles: Patient, Admin
Headers:
Authorization: Bearer <token>
Body:
json
Copy code
{
  "appointmentId": "67874f81813a4e3102116bfc"
}
