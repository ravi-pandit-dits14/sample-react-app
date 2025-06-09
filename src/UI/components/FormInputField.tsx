import { TextField } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import React from 'react';
import type { UseFormRegister } from 'react-hook-form';

type FormInputFieldProps = {
  name: string;
  label?: string;
  type?: string;
  register: UseFormRegister<any>;
  required?: boolean;
  errors?: any;
};

const FormInputField: React.FC<FormInputFieldProps> = ({ label, name, type = 'text', required, register, errors }) => {
  const isError = !!errors?.[name];
  return (
    <div style={{ marginBottom: '10px'}}>
      <TextField
        variant="outlined"
        type={type}
        label={label}
        error={isError}
        {...register(name, { required: "This input is required." })}
        aria-invalid={isError ? "true" : "false"}
        style={{ width: '100%' }}
      />
      {isError && (
        <FormHelperText error>
          {errors[name]?.['message']}
        </FormHelperText>
      )}
    </div>
  );
};

export default FormInputField;
