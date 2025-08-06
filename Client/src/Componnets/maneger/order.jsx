import { useState, useEffect } from "react";
import {
  Box, Typography, Button, MenuItem, Select,
  FormControl, InputLabel, TextField
} from "@mui/material";
import { getAllProviders, getProviderProductsById } from "../../API/providerController";
import { createOrder } from "../../API/orderController";

export default function OrderPage() {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllProviders()
      .then(setProviders)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedProvider) return;
    getProviderProductsById(selectedProvider)
      .then(data => {
        setProducts(data);
        const initialQuantities = {};
        data.forEach(p => { initialQuantities[p._id] = 0; });
        setQuantities(initialQuantities);
        setTotalPrice(0);
      })
      .catch(console.error);
  }, [selectedProvider]);

  useEffect(() => {
    let sum = 0;
    products.forEach(p => {
      const qty = quantities[p._id] || 0;
      if (qty > 0) sum += qty * p.price_per_item;
    });
    setTotalPrice(sum);
  }, [quantities, products]);

  const handleQuantityChange = (productId, value) => {
    const product = products.find(p => p._id === productId);
    const min = product?.minimum_purchase_quantity || 1;
    let qty = parseInt(value);
    if (isNaN(qty) || qty < 0) qty = 0;
    else if (qty > 0 && qty < min) qty = min;

    setQuantities({ ...quantities, [productId]: qty });
  };

  const handleOrder = async () => {
    const invalid = products.some(p => {
      const qty = quantities[p._id] || 0;
      return qty > 0 && qty < (p.minimum_purchase_quantity || 1);
    });

    if (invalid) {
      setMessage("❌ יש להזין כמות 0 או לפחות את הכמות המינימלית לכל מוצר");
      return;
    }

    const items = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([productId, quantity]) => ({ productId, quantity }));

    if (!items.length) {
      setMessage("❌ לא נבחרו פריטים להזמנה");
      return;
    }

    try {
      const res = await createOrder({ providerId: selectedProvider, items });
      if (res?._id) {
        setMessage("✅ ההזמנה בוצעה בהצלחה!");
        const resetQuantities = {};
        products.forEach(p => resetQuantities[p._id] = 0);
        setQuantities(resetQuantities);
        setTotalPrice(0);
      } else {
        setMessage("❌ שגיאה בשליחת ההזמנה");
      }
    } catch (err) {
      setMessage("❌ שגיאה בשליחת ההזמנה: " + err.message);
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

  return (
    <Box sx={{ display: "flex", justifyContent: "center", minHeight: "100vh", py: 4 }}>
      <Box sx={{ maxWidth: 600, width: "100%", px: 2 }}>
        <Typography variant="h4" mb={4} textAlign="center" fontWeight="bold" color="#3f3d56">
          הזמנת מוצרים מספק
        </Typography>

        <FormControl fullWidth sx={inputSx}>
          <InputLabel>בחר ספק</InputLabel>
          <Select
            value={selectedProvider}
            onChange={e => setSelectedProvider(e.target.value)}
            label="בחר ספק"
          >
            {providers.map(p => (
              <MenuItem key={p._id} value={p._id}>{p.company_name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {products.length > 0 && (
          <Box>
            <Typography variant="h6" mb={2} textAlign="right">מוצרים זמינים:</Typography>
            {products.map(p => (
              <Box key={p._id} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Typography sx={{ flex: 1, textAlign: "right" }}>
                  {p.name} (₪{p.price_per_item}){" "}
                  <span style={{ fontSize: "0.85em", color: "#888" }}>
                    (מינימום: {p.minimum_purchase_quantity})
                  </span>
                </Typography>
                <TextField
                  type="number"
                  label="כמות"
                  size="small"
                  value={quantities[p._id] === 0 ? "" : quantities[p._id]}
                  onChange={e => handleQuantityChange(p._id, e.target.value)}
                  inputProps={{ min: 0 }}
                  sx={inputSx}
                />
              </Box>
            ))}
          </Box>
        )}

        <Typography mt={3} fontWeight="bold" textAlign="right">
          סך הכול לתשלום: ₪{totalPrice}
        </Typography>

        <Button
          fullWidth
          onClick={handleOrder}
          sx={{
            mt: 2,
            backgroundColor: "#00796b",
            color: "white",
            fontWeight: "bold",
            '&:hover': { backgroundColor: "#00695c" },
          }}
        >
          אשר הזמנה
        </Button>

        {message && (
          <Typography
            mt={2}
            color={message.startsWith("✅") ? "green" : "error"}
            textAlign="center"
          >
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
