import Admin from '../models/admin.js';

const registerAdmin = async (req, res) => {
  try {
    // Destructure the correct fields coming from your React registration form
    const { name, age, phone, email, password } = req.body;

    // 1. Check if all required fields are present
    if (!name || !age || !phone || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // 2. Check if an account already exists with this email
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Admin with this email already exists' });
    }

    // 3. Create and save the new Admin document to MongoDB
    const newAdmin = new Admin({ name, age, phone, email, password });
    await newAdmin.save();

    // Return success: true to match your frontend logic check (data.success)
    res.status(201).json({ success: true, message: 'Registration successful! Welcome aboard.' });

  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};


const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check for email and password inputs
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // 2. Check if user exists
    const existing = await Admin.findOne({ email });

    // 3. Verify password match
    if (!existing || existing.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // 4. Return successful response with the updated schema fields
    res.status(200).json({
      success: true,
      message: 'Login successful',
      admin: {
        id: existing._id,
        name: existing.name,
        email: existing.email,
        phone: existing.phone,
        age: existing.age
      },
    });

  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export { registerAdmin, loginAdmin };