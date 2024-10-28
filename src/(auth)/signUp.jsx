import React, { useState } from 'react';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  
  // State variables for the form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle sign-up submission
  const handleSignUp = async () => {
    const userData = {
      username: name,  // Adjust based on your API requirement
      email,
      password,
    };

    try {
      const response = await fetch('https://blog-nest-fe.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Registration failed');
      }

      const data = await response.json();
      setSuccess('Registration successful!'); // Handle success
      console.log('User registered:', data);
      
      // Navigate to login or another page
      navigate('/signIn');
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  return (
    <div className='bg-blue h-screen overflow-y-scroll '>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-primary text-4xl font-bold mt-3 mb-5 '>
          Welcome to <br />
          <span className='text-yellow font-mono text-5xl text-center'>BlogNest</span>
        </h1>
        <div className='border-2 border-orange h-[500px] w-[350px] rounded-3xl mb-6'>
          <h1 className='text-yellow text-3xl font-bold mt-3 mb-2 text-center'>Sign Up</h1>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

          <div>
            <FormField
              title='Name'
              placeholder='Enter your name'
              handleChangeText={(value) => setName(value)} // Update state on change
              otherStyles='mt-3 px-4'
            />
            <FormField
              title='Email'
              placeholder='Enter your email'
              handleChangeText={(value) => setEmail(value)} // Update state on change
              otherStyles='mt-2 px-4'
            />
            <FormField
              title='Password'
              placeholder='Enter your password'
              handleChangeText={(value) => setPassword(value)} // Update state on change
              otherStyles='mt-2 px-4'
            />
          </div>
          
          <div className='flex flex-col justify-center items-center'>
            <CustomButton
              title='Sign Up'
              handlePress={handleSignUp} // Call handleSignUp on press
              containerStyles='mt-5 px-4 h-16 w-[315px] flex-1 justify-center items-center rounded-2xl'
            />
            <p className='text-primary text-base font-medium mt-5'>
              Already have an account?  
              <a 
                onClick={() => navigate('/signIn')} 
                className='text-yellow font-bold'
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
