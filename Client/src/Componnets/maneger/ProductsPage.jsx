import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import { getAllProviders } from "../../API/providerController";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProviders()
      .then((providers) =>
        setProducts(
          providers.flatMap((p) =>
            (p.products || []).map((prod) => ({
              ...prod,
              company_name: p.company_name,
            }))
          )
        )
      )
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );

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
        כל המוצרים מכל הספקים
      </Typography>

      {!products.length ? (
        <Typography textAlign="center" sx={{ color: "#777" }}>
          אין מוצרים להצגה.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 2,
          }}
        >
          {products.map((prod) => (
            <Box
              key={prod._id}
              sx={{
                aspectRatio: "1 / 1",
                backgroundColor: "rgba(240, 240, 240, 0.6)",
                borderRadius: 2,
                padding: 1.5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "right",
                overflow: "hidden",
              }}
            >
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    mb: 0.5,
                    fontSize: "0.8rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {prod.name}
                </Typography>
                <Typography sx={{ color: "#555", fontSize: "0.75rem" }}>
                  ₪{prod.price_per_item}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: "#666",
                  fontSize: "0.65rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                ספק: {prod.company_name}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}
