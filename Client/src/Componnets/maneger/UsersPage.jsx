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
import { getAllUsers } from "../../API/usersControllerr";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        const filtered = data.filter((u) => u.role !== "provider");
        setUsers(filtered);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 3, direction: "rtl" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: "center",
          fontWeight: "bold",
          color: "#3f3d56",
        }}
      >
       ניהול משתמשים
      </Typography>

      {users.length === 0 ? (
        <Typography textAlign="center">אין משתמשים להצגה.</Typography>
      ) : (
        <TableContainer component={Paper} elevation={1} sx={{ backgroundColor: 'rgba(240, 240, 240, 0.6)' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">שם משתמש</TableCell>
                <TableCell align="right">תפקיד</TableCell>
                <TableCell align="right">סיסמה</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell align="right">{user.username}</TableCell>
                  <TableCell align="right">
                    {user.role === "admin" ? "מנהל" : user.role}
                  </TableCell>
                  <TableCell align="right">{user.password}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
