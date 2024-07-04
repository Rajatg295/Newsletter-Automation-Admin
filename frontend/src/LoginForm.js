import React, { useContext, useState, } from 'react';
import axios from 'axios';
import { AppContext } from './context/AppContext';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { setLogin} = useContext(AppContext);

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
          const response = await axios.post('http://localhost:5000/api/login', { username, password});
          localStorage.setItem('Admin', true)
          setLogin(true);
          alert(response.data.message)
          console.log('sent')
          navigate("/");
        } catch (error) {
            console.log("error login",error )
            setError(error.message || 'Login failed');
          }
        };

  return (
    <>
    <div className='min-h-screen bg-black flex items-center justify-center'>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Sign in to access your dashboard</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className='flex flex-col'>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md"
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-br from-blue-600 to-blue-500 hover:bg-gradient-to-br from-purple-700 to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>

    </>
    
  );
};

export default LoginForm;