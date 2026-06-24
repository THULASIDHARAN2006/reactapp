import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminController.js';

const router = express.Router();

// Base route for testing
router.get('/', (req, res) => {
  res.json({ message: 'Admin route works' });
});

// Route to handle new registrations from your React form
router.post('/register', registerAdmin);

// Route to handle login attempts later on
router.post('/login', loginAdmin);

export default router;