import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

import { Link } from "react-router-dom";
import { getProviderDetails } from "../../API/providerController";

const supplierActions = [
  { label: "הזמנות לספק", icon: "📬", to: "/ProviderOrdersPage" },
  { label: "הוספת מוצר", icon: "➕", to: "/add-product" },
  { label: "המוצרים שלי", icon: "🥤", to: "/my-product" },

];

export default function HomeProvider() {
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProviderDetails()
      .then(data => {
        setCompanyName(data.company_name);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || "שגיאה בטעינת שם החברה");
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", my: 6, px: 2 }}>
      {loading && <Box sx={{ mb: 3, textAlign: "center" }}>טוען שם חברה...</Box>}
      {error && <Box sx={{ mb: 3, color: "error.main", textAlign: "center" }}>שגיאה: {error}</Box>}
      {!loading && !error && companyName && (
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            textAlign: "center",
            fontWeight: "bold",
            color: "#3f3d56",
            direction: "rtl",
          }}
        >
          ברוכים הבאים {companyName}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          overflowX: "auto",
          justifyContent: "center",
          flexWrap: "nowrap",
          pb: 1,
        }}
      >
        {supplierActions.map(({ label, icon, to }) => (
          <Box
            key={label}
            component={Link}
            to={to}
            sx={{
              minWidth: 140,
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
    </Box>
  );
}
