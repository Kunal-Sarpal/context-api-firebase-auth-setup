import React, { useState } from 'react';
import { useFirebase } from '../Firebase';

function Signup() {


  const { SignupUser, SignupWithGoogle } = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handGoogleSignup = () => {
    try {
       SignupWithGoogle()
    }
    catch (err) {
      alert(err);
    }
  }
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      SignupUser(email, password);

    }
    catch (err) {
      alert(err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6 animate-fadeIn">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email'
            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <button onClick={handleSubmit} className="w-full py-3 mt-6 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
          Sign Up
        </button>
        <div className="flex items-center justify-between mt-4">
          <span className="border-b w-1/5 lg:w-1/4"></span>
          <span className="text-xs text-center text-gray-500 uppercase">or sign up with</span>
          <span className="border-b w-1/5 lg:w-1/4"></span>
        </div>
        <button onClick={handGoogleSignup} className="flex items-center justify-center w-full py-3 mt-4 text-gray-700 border rounded-md hover:bg-gray-100 transition-all duration-300">
          <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M24 9.5c3.5 0 6.4 1.2 8.8 3.4l6.4-6.4C35.5 2.6 30.1 0 24 0 14.5 0 6.4 5.8 2.8 14.2l7.5 5.8C12.3 14 17.6 9.5 24 9.5z" />
            <path fill="#34A853" d="M46.9 24.3c0-1.5-.1-3-.3-4.5H24v9.1h13c-.6 3.1-2.6 5.7-5.3 7.4v6.2h8.6c5-4.6 7.9-11.4 7.9-18.2z" />
            <path fill="#FBBC05" d="M10.3 28.4c-1.1-3.1-1.1-6.5 0-9.6L2.8 13c-3.3 6.4-3.3 14.2 0 20.6l7.5-5.2z" />
            <path fill="#EA4335" d="M24 48c6.5 0 11.9-2.1 15.9-5.7l-7.5-5.9c-2.1 1.4-4.8 2.3-8.4 2.3-6.5 0-12-4.3-13.9-10.4l-7.4 5.2C6.5 42.4 14.8 48 24 48z" />
          </svg>
          Sign Up with Google
        </button>
      </div>
    </div>
  );
}

export default Signup;
