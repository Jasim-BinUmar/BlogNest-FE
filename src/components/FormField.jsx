import React, { useState } from 'react';
import { icons } from '../constants'; // Adjust the import path for icons

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, inputDivStyles, inputStyles,...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`space-y-1 ${otherStyles}`}>
      <label className="text-base text-yellow font-medium">{title}</label>
      <div className={`w-full h-16 px-4 border-2 border-orange bg-primary rounded-2xl flex items-center ${inputDivStyles}`}>
        <input
          className={`flex-1 bg-transparent text-orange font-semibold outline-none ${inputStyles}`}
          type={title === 'Password' && !showPassword ? 'password' : 'text'}
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleChangeText(e.target.value)}
          {...props}
        />

        {title === 'Password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="w-6 h-6 focus:outline-none"
          >
            <img
              src={!showPassword ? icons.eye : icons.eyeHide}
              alt={showPassword ? 'Hide password' : 'Show password'}
              className="w-full h-full object-contain"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default FormField;
