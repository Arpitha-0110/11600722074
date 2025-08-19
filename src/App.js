import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

// Login Component
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      setError("");
      onLogin(true);
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
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
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

// URL Shortener Component
function UrlShortenerApp() {
  const [url, setUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);
  const [error, setError] = useState("");

  // Load URLs from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shortUrls") || "[]");
    setShortUrls(stored);
  }, []);

  // Save URLs to localStorage
  useEffect(() => {
    localStorage.setItem("shortUrls", JSON.stringify(shortUrls));
  }, [shortUrls]);

  // Validate URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Handle shorten
  const handleShorten = () => {
    if (!url) {
      setError("Please enter a URL");
      return;
    }
    if (!isValidUrl(url)) {
      setError("Invalid URL format");
      return;
    }

    setError("");

    const shortCode = Math.random().toString(36).substring(2, 8);

    const newShortUrl = {
      original: url,
      shortCode: shortCode,
      clicks: 0,
    };

    setShortUrls([...shortUrls, newShortUrl]);
    setUrl("");
  };

  // Handle click
  const handleVisit = (index) => {
    const updated = [...shortUrls];
    updated[index].clicks += 1;
    setShortUrls(updated);
    window.open(updated[index].original, "_blank");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        🚀 URL Shortener
      </Typography>

      <Card sx={{ p: 2, mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            label="Enter a long URL"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleShorten}
          >
            Shorten URL
          </Button>
        </CardContent>
      </Card>

      {shortUrls.length > 0 && (
        <Card sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📊 Shortened URLs & Statistics
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Original URL</TableCell>
                  <TableCell>Short URL</TableCell>
                  <TableCell>Clicks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shortUrls.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.original}</TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        color="secondary"
                        onClick={() => handleVisit(index)}
                      >
                        {`short.ly/${item.shortCode}`}
                      </Button>
                    </TableCell>
                    <TableCell>{item.clicks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

// Main App
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? (
    <UrlShortenerApp />
  ) : (
    <Login onLogin={setIsLoggedIn} />
  );
}
