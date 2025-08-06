import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const actions = [
  { label: "ספקים", icon: "📋", to: "/providers" },
  { label: "סחורה", icon: "📦", to: "/products" },
  { label: "הזמנות פעילות", icon: "🕒", to: "/active-orders" },//,דף קיים לא עשוי
  { label: "הזמנות", icon: "📑", to: "/orders" },//דף קיים לא עשוי
  { label: "הזמנה", icon: "📃", to: "/order" },//דף  קיים ולא עשוי
  { label: "הוספת משתמש חדש", icon: "➕", to: "/add-user" },//דף  קיים ולא עשוי
  { label: "משתמשים", icon: "👨‍👩‍👧‍👦", to: "/users" },
];

export default function AdminLinksGrid() {
  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        my: 6,
        px: 2,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 2,
        justifyItems: "center",
      }}
    >
      {actions.map(({ label, icon, to }) => (
        <Box
          key={label}
          component={Link}
          to={to}
          sx={{
            width: 140,
            height: 140,
            bgcolor: "#f5f5f5",
            borderRadius: 2,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            color: "#444",
            fontWeight: "600",
            fontSize: 16,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            "&:hover": { bgcolor: "#e0e0e0" },
          }}
        >
          <span style={{ fontSize: 40, marginBottom: 8 }}>{icon}</span>
          {label}
        </Box>
      ))}
    </Box>
  );
}
