import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Log from './pages/Log';
import './App.css';

function Register() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // States for tracking form submission feedback
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Connected to MongoDB via Express Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (name && age && phone && email && password) {
      try {
        const response = await fetch('http://localhost:5000/api/admin/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, age, phone, email, password }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Success state tracking
          setIsSuccess(true);
          setFeedbackMessage(data.message);

          // Clear out the input fields after successful MongoDB insertion
          setName('');
          setAge('');
          setPhone('');
          setEmail('');
          setPassword('');
        } else {
          // Error response handling from database validation rules
          setIsSuccess(false);
          setFeedbackMessage(data.message || 'Registration failed.');
        }
      } catch (error) {
        // Safe catch fallback if backend server goes down
        setIsSuccess(false);
        setFeedbackMessage('Unable to connect to the server. Please ensure your backend is running.');
      }
    } else {
      setIsSuccess(false);
      setFeedbackMessage('Please fill out all the fields correctly.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          border: '1px solid white',
          padding: '30px',
          borderRadius: '15px',
          color: 'white',
          minWidth: '350px',
          background: 'rgba(0,0,0,0.5)',
          boxShadow: '0 10px 25 rgba(0,0,0,0.3)',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            color: '#ff4d4d',
            margin: '0 0 10px 0',
          }}
        >
          Register
        </h1>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          Enter Your Name:
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{ padding: '8px', borderRadius: '5px', border: 'none' }}
            required
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          Enter Your Age:
          <input 
            type="text" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
            style={{ padding: '8px', borderRadius: '5px', border: 'none' }}
            required
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          Phone number:
          <input 
            type="text" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            style={{ padding: '8px', borderRadius: '5px', border: 'none' }}
            required
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          Email:
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ padding: '8px', borderRadius: '5px', border: 'none' }}
            required
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          Password:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ padding: '8px', borderRadius: '5px', border: 'none' }}
            required
          />
        </label>

        <button
          type="submit"
          style={{
            marginTop: '15px',
            padding: '12px',
            borderRadius: '25px',
            border: 'none',
            background: 'linear-gradient(45deg, #ff512f, #dd2476)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.03)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Submit
        </button>

        {/* Dynamic banner matching state context messages */}
        {feedbackMessage && (
          <div
            style={{
              marginTop: '15px',
              padding: '10px',
              borderRadius: '5px',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              backgroundColor: isSuccess ? 'rgba(40, 167, 69, 0.2)' : 'rgba(220, 53, 69, 0.2)',
              color: isSuccess ? '#28a745' : '#dc3545',
              border: isSuccess ? '1px solid #28a745' : '1px solid #dc3545',
            }}
          >
            {feedbackMessage}
          </div>
        )}
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Log />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;