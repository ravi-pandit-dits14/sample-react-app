import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../core/interceptor';
import FormInputField from '../../UI/components/FormInputField';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
}

type Order = 'asc' | 'desc';
type OrderBy = keyof User;

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('id');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    api
      .get('/users')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to first page when searching
  };

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setPage(0); // Reset to first page when sorting
  };

  const compareValues = (a: any, b: any, orderBy: OrderBy) => {
    if (orderBy === 'id') {
      return a[orderBy] - b[orderBy];
    }
    return a[orderBy].toString().toLowerCase().localeCompare(b[orderBy].toString().toLowerCase());
  };

  const getSortedUsers = (users: User[], order: Order, orderBy: OrderBy) => {
    return users.sort((a, b) => {
      const comparison = compareValues(a, b, orderBy);
      return order === 'desc' ? -comparison : comparison;
    });
  };

  // Filter and sort users
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = getSortedUsers([...filteredUsers], order, orderBy);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    reset();
  };

  const onSubmit = (values: UserFormData) => {
    setSubmitting(true);
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
        console.log('User created successfully:', response.data);
        setSubmitting(false);
        handleCloseDialog();
        fetchUsers(); // Refresh the users list
      })
      .catch((error) => {
        console.error('User creation failed:', error);
        setSubmitting(false);
      });
  };

  // Calculate pagination based on sorted and filtered users
  const paginatedUsers = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ padding: 3, backgroundColor: '#fff' }}>
      {/* Header with Search and Add User Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          Users
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            sx={{ minWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={{ backgroundColor: '#1976d2' }}
          >
            Add User
          </Button>
        </Box>
      </Box>

      {/* Users Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : 'asc'}
                  onClick={() => handleRequestSort('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'email'}
                  direction={orderBy === 'email' ? order : 'asc'}
                  onClick={() => handleRequestSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'role'}
                  direction={orderBy === 'role' ? order : 'asc'}
                  onClick={() => handleRequestSort('role')}
                >
                  Role
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    {searchTerm ? `No users found matching "${searchTerm}"` : 'No users found'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Add User Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <FormControl fullWidth>
                <FormInputField
                  label="Name"
                  name="name"
                  register={register}
                  errors={errors}
                  required={true}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormInputField
                  label="Email"
                  name="email"
                  register={register}
                  errors={errors}
                  type="email"
                  required={true}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormInputField
                  label="Password"
                  name="password"
                  type="password"
                  register={register}
                  errors={errors}
                  required={true}
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} disabled={submitting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={submitting}
              startIcon={submitting ? <CircularProgress size={20} /> : null}
            >
              {submitting ? 'Adding...' : 'Add User'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Users;