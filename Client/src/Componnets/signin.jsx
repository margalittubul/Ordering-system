import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { loginCustomer } from '../API/usersControllerr';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const parseJwt = (token) => {
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(json);
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginCustomer(form);
      if (!res.token) return setError('משתמש לא נמצא. אנא הירשם.');

      localStorage.setItem('userToken', res.token);
      window.dispatchEvent(new Event('user-logged-in'));
      const decoded = parseJwt(res.token);

      if (!decoded?.role) return setError('שגיאה בזיהוי תפקיד המשתמש.');
      navigate(
        decoded.role === 'provider'
          ? '/HomeProvider'
          : decoded.role === 'admin'
          ? '/HomeMeneger'
          : '/'
      );
    } catch {
      setError('שגיאה בהתחברות. ודא שהפרטים נכונים.');
    }
  };

  return (
    <Box display="flex" justifyContent="center" px={2} pt={1} pb={3}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        maxWidth={400}
        width="100%"
        noValidate
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant="h5"
          mb={3}
          fontWeight="bold"
          textAlign="center"
          color="#444"
        >
          התחברות
        </Typography>

        {['username', 'password'].map((field) => (
          <TextField
            key={field}
            name={field}
            type={field === 'password' ? 'password' : 'text'}
            label={field === 'username' ? 'שם משתמש' : 'סיסמא'}
            value={form[field]}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              mb: 2,
              bgcolor: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(5px)',
              borderRadius: 1,
              input: { color: '#444' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#bbb' },
                '&:hover fieldset': { borderColor: '#999' },
                '&.Mui-focused fieldset': { borderColor: '#666' },
              },
            }}
          />
        ))}

        {error && (
          <Typography color="error" fontSize={14} textAlign="center" mb={2}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: '#00796b',
            color: '#fff',
            fontWeight: 'bold',
            width: 150,
            mx: 'auto',
            display: 'block',
            '&:hover': { backgroundColor: '#00695c' },
          }}
        >
          התחבר
        </Button>

        <Button
          onClick={() => navigate('/loginProvider')}
          variant="text"
          sx={{
            mt: 2,
            color: '#444',
            fontWeight: 'bold',
            display: 'block',
            mx: 'auto',
            textDecoration: 'underline',
          }}
        >
          עדיין לא ספק? הירשם כאן
        </Button>
      </Box>
    </Box>
  );
}
