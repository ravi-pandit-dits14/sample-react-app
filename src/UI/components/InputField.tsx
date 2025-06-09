import { Input, type InputRef } from 'antd';
import React, { forwardRef } from 'react';

type InputFieldProps = {
  label: string;
  type: string;
  placeholder: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, type, placeholder, error, ...rest }, ref) => {
    const { size, ...filteredRest } = rest; // Exclude 'size' from rest
    return (
      <div style={{ marginBottom: '10px' }} className="field mb-3">
        {/* <label className="block text-sm font-medium mb-1">{label}</label> */}
        <Input
          type={type}
          placeholder={placeholder}
          ref={ref as React.Ref<InputRef>} // Pass ref for react-hook-form
          {...filteredRest}
        />
        {error && <small className="p-error">{error}</small>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
