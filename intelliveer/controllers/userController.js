const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Validate role input
    if (!['Patient', 'Doctor', 'Admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ token: generateToken(user._id) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };
