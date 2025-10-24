import React, { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword) {
      toast.error('All fields are required');
      return false;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    const loadingToast = toast.loading('Creating your account...');

    try {
      await api.post('/auth/register', {
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
      });
      
      toast.success('Account created successfully! Please login.', {
        id: loadingToast,
        duration: 4000,
      });
      
      navigate('/login');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      toast.error(errorMessage, {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <form className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100" onSubmit={handleSubmit}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600 text-sm">Sign up to get started</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">First Name</label>
            <input 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
              name="firstName" 
              placeholder="firstname" 
              value={form.firstName} 
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Last Name</label>
            <input 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
              name="lastName" 
              placeholder="lastname" 
              value={form.lastName} 
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <input 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
            name="email" 
            type="email"
            placeholder="email" 
            value={form.email} 
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <input 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
            name="password" 
            type="password" 
            placeholder="Min. 6 characters" 
            value={form.password} 
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
          <input 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
            name="confirmPassword" 
            type="password" 
            placeholder="Re-enter password" 
            value={form.confirmPassword} 
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <button 
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>

        <div className="mt-6 text-sm text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;