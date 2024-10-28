import React from 'react'
import CustomButton from '../components/CustomButton';
import images from '../constants/images';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
    return (
      <div className='bg-blue h-screen overflow-y-scroll'>      
        <div className='flex flex-col justify-center items-center '>
          {/* Heading */}
          <div className='w-full h-16 bg-gradient-to-r from-blue to-lightBlue flex justify-center items-center'>
          <h1 className='text-primary text-3xl font-bold mt-5 mb-5' >Welcome to <span className='text-yellow font-mono text-4xl'>BlogNest</span></h1>
          </div>
  
  
          <div className='flex flex-col lg:flex-row gap-3 mt-5 px-2'>
            {/* This will be displayed only on small screens (mobile) */}
            <div className='block lg:hidden'>
              <div className='flex flex-row justify-center items-center '>
                <img src={images.firstImage} alt='first' className='mt-6 mb-5 object-cover w-[250px] h-[350px] rounded-3xl -rotate-12 -mr-28' />
                <img src={images.fourthImage} alt='fourth' className='mt-6 mb-5 object-cover w-[250px] h-[350px] rounded-3xl rotate-12 ' />
              </div>
              <p className='text-primary justify-center text-center text-xl font-bold mt-5'><span className='text-yellow'>Discover </span>A world of ideas, stories, and inspiration!</p>
            </div>
            
  
            
            {/* This will be displayed on screens larger than mobile (tablet, desktop) */}
            <div className='hidden lg:flex flex-row gap-3 mt-5 px-2'>
              <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-row gap-3 mt-3 '>
                  <img src={images.firstImage} alt='first' className='object-cover w-[300px] h-[225px] rounded-3xl' />
                  <img src={images.secondImage} alt='second' className='object-cover w-[800px] h-[225px] rounded-3xl'/>
                </div>
                <div className='flex flex-row justify-center items-center gap-3 mt-3 '>
                  <img src={images.thirdImage} alt='third' className='object-cover w-[800px] h-[225px] rounded-3xl'/>
                  <img src={images.fourthImage} alt='fourth' className='object-cover w-[300px] h-[225px] rounded-3xl'/>
                </div>
              </div>
            
            </div>
          </div>
          {/* Images */}  
  
  
          {/* Button */}
          <CustomButton title="Continue With Email" handlePress={() => navigate('/signup')} containerStyles="h-[50px] flex-1 justify-center items-center rounded-sm mt-5 mb-5" textStyles="px-5"/>
        </div>
      </div>
  
    );
  }
export default LandingPage