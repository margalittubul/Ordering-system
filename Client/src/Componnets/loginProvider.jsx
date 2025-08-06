import { useState } from 'react';
import { Box, TextField, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createProvider } from '../API/providerController';

export default function LoginProvider() {
  const [form, setForm] = useState({
    companyName: '',
    phone: '',
    representativeName: '',
    password: '',
  });
  const [products, setProducts] = useState([
    { name: '', price_per_item: '', minimum_purchase_quantity: '' },
  ]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFormChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleProductChange = (i, e) =>
    setProducts((prev) =>
      prev.map((p, idx) =>
        idx === i ? { ...p, [e.target.name]: e.target.value } : p
      )
    );

  const addProduct = () =>
    setProducts((prev) => [
      ...prev,
      { name: '', price_per_item: '', minimum_purchase_quantity: '' },
    ]);

  const removeProduct = (i) =>
    setProducts((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProvider({ ...form, products });
      res.success ? navigate('/') : setError('רישום נכשל');
    } catch {
      setError('שגיאה ברישום');
    }
  };

  const inputSx = {
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
  };

  const labels = {
    companyName: 'שם חברה',
    phone: 'טלפון',
    representativeName: 'שם נציג',
    password: 'סיסמה',
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" px={2} minHeight="100vh">
      <Box component="form" onSubmit={handleSubmit} maxWidth={600} width="100%">
        <Typography
          variant="h4"
          mb={4}
          textAlign="center"
          fontWeight="bold"
          color="#3f3d56"
        >
          רישום ספק
        </Typography>

        {Object.keys(form).map((key) => (
          <TextField
            key={key}
            name={key}
            type={key === 'password' ? 'password' : 'text'}
            label={labels[key]}
            value={form[key]}
            onChange={handleFormChange}
            required
            fullWidth
            sx={inputSx}
          />
        ))}

        <Typography
          variant="h4"
          mb={1}
          textAlign="center"
          fontWeight="bold"
          color="#3f3d56"
        >
          מוצרים
        </Typography>

        {products.map((p, i) => (
          <Box
            key={i}
            display="flex"
            gap={1}
            alignItems="center"
            mb={1}
            flexWrap="wrap"
          >
            <TextField
              name="name"
              label="שם"
              value={p.name}
              onChange={(e) => handleProductChange(i, e)}
              required
              fullWidth
              sx={inputSx}
            />
            <TextField
              name="price_per_item"
              label="מחיר"
              type="number"
              value={p.price_per_item}
              onChange={(e) => handleProductChange(i, e)}
              required
              sx={inputSx}
            />
            <TextField
              name="minimum_purchase_quantity"
              label="מינימום"
              type="number"
              value={p.minimum_purchase_quantity}
              onChange={(e) => handleProductChange(i, e)}
              required
              sx={inputSx}
            />
            <IconButton onClick={() => removeProduct(i)} disabled={products.length === 1}>
              מחק
            </IconButton>
          </Box>
        ))}

        <Button onClick={addProduct} sx={{ mb: 2, color: '#555' }}>
          הוסף מוצר
        </Button>

        {error && (
          <Typography color="error" textAlign="center" mb={2}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          sx={{
            backgroundColor: '#00796b',
            color: 'white',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#00695c' },
          }}
        >
          הירשם
        </Button>
      </Box>
    </Box>
  );
}
