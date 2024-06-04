import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithEmailAndPassword, signInWithPopup } from "../firebase";

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        SageBot
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn({ userToken }) {
  let navigate = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ open: false, message: "", severity: "error" });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  const handleEmailSignIn = async (event) => {
    event.preventDefault();
    if (userData.email === "" || userData.password === "") {
      setAlert({ open: true, message: "Please fill in all fields!", severity: "error" });
      return;
    }
    try { 
      const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
      const id = userCredential.user.uid;
      userToken(id);
      navigate("/home");
    } catch (error) {
      console.error("Error signing in with email and password:", error);
      if(error.code === "auth/invalid-email"){
        setAlert({ open: true, message: "Invalid Credentials!", severity: "error" });
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const id = result.user.uid;
      userToken(id);
      navigate("/home");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setAlert({ open: true, message: "Error signing in with Google: " + error.message, severity: "error" });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleEmailSignIn} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              autoComplete="current-password"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Snackbar open={alert.open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
