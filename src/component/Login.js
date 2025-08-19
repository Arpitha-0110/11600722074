import React, { useState } from "react";
import { Container, TextField, Button, Typography, Card, CardContent, Alert } from "@mui/material";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Simple demo login (username: admin, password: 1234)
    if (username === "admin" && password === "1234") {
      setError("");
      onLogin(true); // notify parent that login is successful
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Card sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Login
          </Typography>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mt: 2 }}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;
