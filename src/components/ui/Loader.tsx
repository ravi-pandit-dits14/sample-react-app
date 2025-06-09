import { Box, CircularProgress } from '@mui/material';

const Loader = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
    <CircularProgress size={48} />
  </Box>
);

export default Loader;