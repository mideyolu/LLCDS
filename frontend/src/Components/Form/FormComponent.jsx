// FormComponent.jsx
import React, { useState } from 'react';

const FormComponent = ({ onSubmit, isLogin, imageUrl }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const userData = isLogin ? { username, password } : { username, email, password };
            const data = await onSubmit(userData);
            console.log(data); // Handle successful response (e.g., store token)
        } catch (err) {
            setError(err.message); // Assuming err has a message property
        }
    };

    return (
      <div className="flex h-screen">
        <div className="flex flex-col justify-center w-[60%] max-w-md p-10 mx-auto ">
          <h2 className="text-2xl font-bold mb-6 text-center underline-offset-8 underline">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 rounded-lg shadow-md md:rounded-none md:shadow-none "
          >
            <div>
              <label className="block">Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border p-2 w-full md:w-[60%] rounded"
              />
            </div>
            {!isLogin && (
              <div>
                <label className="block">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border p-2 w-full md:w-[60%] rounded"
                />
              </div>
            )}
            <div>
              <label className="block">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border p-2 w-full md:w-[60%] rounded"
              />
            </div>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded w-full md:w-[60%]"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
        <div className="hidden md:flex md:w-1/2 bg-blue-800 items-center justify-center">
          <img
            src={imageUrl}
            alt="Background"
            className="object-contain max-w-full max-h-full"
          />
        </div>
      </div>
    );
};

export default FormComponent;
