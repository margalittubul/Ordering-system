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

export default function ActiveOrdersPage() {
  const [activeOrders, setActiveOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);

  const fetchOrders = async () => {
    setRefreshing(true);
    try {
      const data = await getAllOrders();
      const filtered = data.filter((order) => order.status !== "הושלם");
      setActiveOrders(filtered);
    } catch (err) {
      console.error("שגיאה בשליפת הזמנות:", err);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleComplete = async (orderId) => {
    setLoading(true);
    try {
      await updateOrder(orderId, { status: "הושלם" });
      fetchOrders();
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
        הזמנות פעילות
      </Typography>

      {activeOrders.length === 0 ? (
        <Typography sx={{ color: "#777" }} textAlign="center">
          אין כרגע הזמנות פעילות.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {activeOrders.map((order) => (
            <Paper
              key={order._id}
              elevation={2}
              sx={{
                p: 2,
                backgroundColor: "rgba(240, 240, 240, 0.6)",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: "#333" }}>
                ספק: {order.provider_id?.company_name || "לא ידוע"}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2">
                נציג: {order.provider_id?.Representative_name || "לא ידוע"}
              </Typography>
              <Typography variant="body2">
                טלפון: {order.provider_id?.phone || "לא ידוע"}
              </Typography>
              <Typography variant="body2">סטטוס: {order.status}</Typography>
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
              <Button
                variant="contained"
                color="success"
                size="small"
                
                sx={{ mt: 2, backgroundColor: "#00796b" }}
                disabled={loading}
                onClick={() => handleComplete(order._id)}
              >
                סמן כהושלם
              </Button>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
}
