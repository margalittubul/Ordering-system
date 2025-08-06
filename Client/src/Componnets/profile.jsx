
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import { fetchUserDetails } from "../API/usersControllerr";

export default function Profile() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails().then(data => {
      if (data?.username) {
        setUserName(data.username);
      } else {
        localStorage.removeItem("userToken");
        window.dispatchEvent(new Event('user-logged-out'));
        navigate("/");
      }
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.dispatchEvent(new Event("user-logged-out"));
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h4"
        sx={{
          mb: 4,
          textAlign: "center",
          fontWeight: "bold",
          color: "#3f3d56",
        }} gutterBottom>
          
        שלום, {userName || "..."}
      </Typography>
      <Button variant="contained" color="error" onClick={handleLogout}>
        התנתקות
      </Button>
    </Container>
  );
}
