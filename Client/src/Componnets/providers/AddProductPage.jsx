import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { createProduct } from "../../API/productController.js";
import { addProductToProvider } from "../../API/providerController.js";

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    price_per_item: "",
    minimum_purchase_quantity: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const created = await createProduct(form);
      await addProductToProvider(created._id);
      setMessage("✅ המוצר נוסף בהצלחה!");
      setForm({ name: "", price_per_item: "", minimum_purchase_quantity: "" });
    } catch {
      setMessage("❌ שגיאה בהוספת המוצר");
    }
  };

  const inputSx = {
    mb: 2,
    bgcolor: "rgba(255,255,255,0.25)",
    backdropFilter: "blur(5px)",
    borderRadius: 1,
    input: { color: "#444" },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#bbb' },
      '&:hover fieldset': { borderColor: '#999' },
      '&.Mui-focused fieldset': { borderColor: '#666' },
    },
  };

  return (
    <Box display="flex" justifyContent="center" py={4}>
      <Box
        sx={{
          maxWidth: 500,
          width: "100%",
          px: 2,
          p: 3,
          borderRadius: 2,
          bgcolor: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h5"
          mb={3}
          textAlign="center"
          fontWeight="bold"
          color="#3f3d56"
        >
          הוספת מוצר חדש
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="שם מוצר"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
            sx={inputSx}
          />

          <TextField
            label="מחיר ליחידה"
            name="price_per_item"
            type="number"
            value={form.price_per_item}
            onChange={handleChange}
            fullWidth
            required
            sx={inputSx}
          />

          <TextField
            label="כמות מינימלית להזמנה"
            name="minimum_purchase_quantity"
            type="number"
            value={form.minimum_purchase_quantity}
            onChange={handleChange}
            fullWidth
            required
            sx={inputSx}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "#00796b",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#00695c" },
            }}
          >
            הוסף מוצר
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
    </Box>
  );
}
