import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import FormInputField from '../../UI/components/FormInputField';
import api from '../../core/interceptor';
import type { LoginInputModel } from './schema/auth.schema';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputModel>();
  const navigate = useNavigate();

  const onSubmit = (values: LoginInputModel) => {
    api
      .post('auth/login', values)
      .then((response) => {
        console.log('Login successful:', response.data);
        localStorage.setItem('token', response.data.access_token);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Login failed:', error);
        // Handle login failure (e.g., show error message)
      });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Box
        width="100%"
        maxWidth={400}
        bgcolor="#fff"
        p={4}
        borderRadius={2}
        boxShadow={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <img
          src="https://png.pngtree.com/png-clipart/20241221/original/pngtree-ai-robot-png-image_18121576.png"
          alt="User Illustration"
          style={{
            width: 120,
            height: 120,
            objectFit: 'cover',
            borderRadius: '50%',
            marginBottom: 24, // minor gap below the image
          }}
        />
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <FormControl fullWidth margin="normal">
            <FormInputField label="Email" name="email" register={register} type="email" required={true} errors={errors} />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <FormInputField label="Password" name="password" register={register} required type="password" errors={errors} />
          </FormControl>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Box>
           <>
        Developer use: <br/>
        <span>"email": "admin@mail.com", "password": "admin123"</span>
      </>
          {/* <Box textAlign="center" mt={3}>
            <Link to="/register" style={{ marginTop: '1rem', display: 'block' }}>
              Don't have an account? Register here
            </Link>
          </Box> */}
        </form>
      </Box>
     
    </Box>
  );
}

export default Login;
