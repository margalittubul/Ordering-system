
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import { getAllOrders, updateOrder } from "../../API/orderController";
import { fetchUserDetails } from "../../API/usersControllerr";

export default function ProviderOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [user, setUser] = useState(null);

  const fetchOrders = async (providerId) => {
    setRefreshing(true);
    try {
      const data = await getAllOrders();
      const filtered = data.filter(
        (order) => order.provider_id?._id === providerId
      );
      setOrders(filtered);
    } catch (err) {
      console.error("שגיאה בשליפת הזמנות:", err);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const currentUser = await fetchUserDetails();
        if (currentUser?.id) {
          setUser(currentUser);
          await fetchOrders(currentUser.id);
        }
      } catch (err) {
        console.error("שגיאה בשליפת פרטי המשתמש:", err);
      }
    };
    init();
  }, []);

  const handleStatusUpdate = async (orderId) => {
    setLoading(true);
    try {
      await updateOrder(orderId, { status: "בתהליך" });
      await fetchOrders(user.id);
    } catch (err) {
      alert("שגיאה בעדכון סטטוס ההזמנה");
    }
    setLoading(false);
  };

  if (refreshing) {
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
        ההזמנות שלי כספק
      </Typography>

      {orders.length === 0 ? (
        <Typography sx={{ color: "#777" }} textAlign="center">
          אין הזמנות להצגה.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {orders.map((order) => (
            <Paper
              key={order._id}
              elevation={2}
              sx={{
                p: 2,
                backgroundColor: "rgba(240, 240, 240, 0.6)",
                borderRadius: 2,
              }}
            >
              <Typography variant="body2">סטטוס: {order.status}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" sx={{ mt: 1 }}>
                מוצרים בהזמנה:
              </Typography>
              <Box sx={{ pl: 2, mt: 1 }}>
                {order.products?.map((item, index) => (
                  <Typography key={index} variant="body2">
                    • {item.productId?.name || "מוצר לא ידוע"} – כמות: {item.quantity}
                  </Typography>
                ))}
              </Box>

              {order.status === "הוזמן" && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mt: 2,backgroundColor: "#00796b" }}
                  disabled={loading}
                  onClick={() => handleStatusUpdate(order._id)}
                >
                  העבר ל"בתהליך"
                </Button>
              )}

              {order.status === "בתהליך" && (
                <Typography sx={{ mt: 2 }} color="success.main">
                  ההזמנה בעבודה
                </Typography>
              )}
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
}
