import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { getProviderProducts } from "../../API/providerController";

const MyProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProviderProducts()
      .then(setProducts)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <Typography color="error">❌ שגיאה: {error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, direction: "rtl" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: "center",
          fontWeight: "bold",
          color: "#3f3d56",
        }}
      >
       המוצרים שלי
      </Typography>

      {!products.length ? (
        <Typography textAlign="center" sx={{ color: "#777" }}>
          אין מוצרים להצגה.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
            gap: 1.5,
          }}
        >
          {products.map((prod) => (
            <Box
              key={prod._id}
              sx={{
                aspectRatio: "1 / 1",
                backgroundColor: "rgba(240, 240, 240, 0.8)",
                borderRadius: 2,
                padding: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "right",
                overflow: "hidden",
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    mb: 0.5,
                    fontSize: "0.75rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {prod.name}
                </Typography>
                <Typography sx={{ color: "#555", fontSize: "0.7rem" }}>
                  ₪{prod.price_per_item}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: "#666",
                  fontSize: "0.6rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                מינימום: {prod.minimum_purchase_quantity}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default MyProduct;
