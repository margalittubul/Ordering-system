import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getAllProviders } from "../../API/providerController";

export default function ProvidersPage() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllProviders();
        setProviders(data);
      } catch {
        setError("שגיאה בטעינת הספקים");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4, direction: "rtl" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: "center",
          fontWeight: "bold",
          color: "#3f3d56",
        }}
      >
        רשימת ספקים
      </Typography>

      {error ? (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      ) : providers.length === 0 ? (
        <Typography sx={{ color: "#777" }} textAlign="center">
          אין ספקים להצגה.
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          elevation={1}
          sx={{
            backgroundColor: "rgba(240, 240, 240, 0.6)",
            borderRadius: 2,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">שם החברה</TableCell>
                <TableCell align="right">נציג</TableCell>
                <TableCell align="right">טלפון</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {providers.map((p) => (
                <TableRow key={p._id}>
                  <TableCell align="right">{p.company_name}</TableCell>
                  <TableCell align="right">{p.Representative_name}</TableCell>
                  <TableCell align="right">{p.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
