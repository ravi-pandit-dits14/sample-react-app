import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInputField from '../../UI/components/FormInputField';
import api from '../../core/interceptor';
import type { LoginInputModel } from './schema/auth.schema';

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInputModel>();

  const onSubmit = (values: any) => {
    console.log('Form submitted:', values);
    const avatar = `https://avatar.iran.liara.run/username?username=${values.name}`;
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: 'customer',
      avatar: avatar,
    };
    api
      .post('/users', payload)
      .then((response) => {
        console.log('Registration successful:', response.data);
        reset();
      })
      .catch((error) => {
        console.error('Registration failed:', error);
      });
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto' }}>
      <h3 className="text-center">Register</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormInputField label="Name" name="name" register={register} errors={errors} />
        </FormControl>
        <FormControl>
          <FormInputField label="Email" name="email" register={register} errors={errors} type="email" required={true} />
        </FormControl>
        <FormControl>
          <FormInputField label="Password" name="password" type="password" register={register} errors={errors} />
        </FormControl>
        <div className="text-right">
          <Button variant="contained" type="submit" style={{ width: 'auto' }}>
            Register
          </Button>
        </div>
        <div className="text-center mt-3">
          <Link to="/login" className="text-white" style={{ marginTop: '1rem', display: 'block' }}>
            Already have an account? Login here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
