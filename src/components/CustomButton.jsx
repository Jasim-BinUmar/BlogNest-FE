import React from 'react'
const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {

  return (
    <div>
      <button 
        disabled={isLoading}
        className={`bg-yellow  ${containerStyles} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        activeOpacity={0.7}
        onClick={handlePress}

      >
        <p className={`text-blue text-lg font-semibold ${textStyles}`}>
          {title}
        </p>
      </button>
    </div>
  )
}

export default CustomButton