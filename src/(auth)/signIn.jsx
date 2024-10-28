import React, { useState } from 'react'
import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import { useNavigate } from 'react-router-dom';
import DialogOne from '../components/DialogOne'
const SignIn = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle sign-up submission
    const handleSignIn = async () => {
        setError(''); // Reset error before a new sign-in attempt
        console.log(email, password);
        const userData = {
            //username: name,  // Adjust based on your API requirement
            email,
            password,
        };

        try {
            const response = await fetch('https://blog-nest-be.vercel.app/api/auth/login', {
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
            localStorage.setItem('token', data.token);
            localStorage.setItem('authorId',data._id)
            console.log('User registered:', data);

            // Navigate to login or another page
            navigate('/homepage');
        } catch (error) {
            setError(error.message);
            
            console.error('Error:', error);
        }
    };

    return (
        <div className='bg-blue h-screen overflow-y-scroll flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-primary text-4xl font-bold mt-5 mb-10 ' >Welcome to <br /> <span className='text-yellow font-mono text-5xl text-center'>BlogNest</span></h1>
                <div className='border-2 border-orange h-[430px] w-[350px] rounded-3xl mb-6'>
                    <h1 className='text-yellow text-3xl font-bold mt-3 mb-2 text-center'>Sign In</h1>

                    <div>
                        <FormField title='Email' placeholder='Enter your email' handleChangeText={(value) => setEmail(value)} otherStyles='mt-5 px-4' />
                        <FormField title='Password' placeholder='Enter your password' handleChangeText={(value) => setPassword(value)} otherStyles='mt-5 px-4' />
                    </div>

                    <div className='flex flex-col justify-center items-center'>
                        <CustomButton title='Sign In' handlePress={ handleSignIn} isLoading={false} containerStyles='mt-5 px-4 h-16 w-[315px] flex-1 justify-center items-center rounded-2xl  ' />
                      
                        <p className='text-primary text-base font-medium mt-5'>Don't have an account?  <a onClick={() => navigate('/signUp')} href={() => navigate('/signUp')} className='text-yellow font-bold'>Sign Up</a></p>
                    </div>


                </div>

            </div>

            {/* Show DialogOne if there's an error */}
            {error && (
                <DialogOne
                    title="Error"
                    message={error}
                    buttonTitle='OK'
                    onClose={() => setError('')} // Clear the error when the dialog is closed
                />
            )}

        </div>
    )
}

export default SignIn;
