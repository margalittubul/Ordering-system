import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { createUser } from "../../API/usersControllerr";

export default function AddUser() {
  const [form, setForm] = useState({ username: "", password: "", role: "admin" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setMessage("❌ הסיסמה חייבת להכיל לפחות 6 תווים.");
      return;
    }

    try {
      const result = await createUser(form);

      if (result.error || result.message) {
        if (
          result.message.toLowerCase().includes("already exists") ||
          result.message.toLowerCase().includes("כבר קיים")
        ) {
          setMessage("❌ שם משתמש וסיסמה אלו כבר קיימים במערכת.");
        } else {
          setMessage(result.message || "❌ אירעה שגיאה בעת יצירת המשתמש.");
        }
        return;
      }

      setMessage("✅ המשתמש נוצר בהצלחה!");
      setForm({ username: "", password: "", role: "admin" });
    } catch (error) {
      console.error(error);
      setMessage("❌ אירעה שגיאה בעת יצירת המשתמש.");
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
    <Box sx={{ display: "flex", justifyContent: "center", minHeight: "100vh", py: 4 }}>
      <Box sx={{ maxWidth: 500, width: "100%", px: 2 }}>
        <Typography
          variant="h4"
          mb={4}
          textAlign="center"
          fontWeight="bold"
          color="#3f3d56"
        >
          הוספת משתמש חדש
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="שם משתמש"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            required
            sx={inputSx}
          />

          <TextField
            label="סיסמה"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            sx={inputSx}
          />

          <FormControl fullWidth sx={inputSx}>
            <InputLabel>תפקיד</InputLabel>
            <Select
              name="role"
              value={form.role}
              onChange={handleChange}
              label="תפקיד"
            >
              <MenuItem value="admin">מנהל</MenuItem>
              <MenuItem value="provider">ספק</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 1,
              backgroundColor: "#00796b",
              color: "white",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#00695c" },
            }}
          >
            הוסף משתמש
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
