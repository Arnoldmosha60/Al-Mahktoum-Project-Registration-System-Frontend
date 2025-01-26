import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'; // Import Heroicons

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    password: '',
    email: '',
    national_id: '',
    gender: '',
  });
  console.log(formData);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the email is valid
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      const response = await API.post('/auth/register/', formData);
      console.log(response);
      if(response.status === 201) {
        setSuccess(true);
        toast.success('Registration successful!');

        // Redirect to the login page after a short delay
        setTimeout(() => navigate('/'), 2000); // 2-second delay for user feedback
      }
      console.log("Registration Failed!!");
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          {success && <p className="text-green-500">Registration successful!</p>}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="text"
            name="national_id"
            placeholder="National ID"
            value={formData.national_id}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-600"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-600" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate('/')}
            >
              Login here
            </span>
          </p>
        </div>
      </div>

      {/* Add the ToastContainer to show the toast messages */}
      <ToastContainer />
    </div>
  );
};

export default Register;
