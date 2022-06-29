import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useState } from "react";
import { getUserState } from '@src/redux/token.Slicers';
import { useSelector } from 'react-redux';
import {useRouter} from 'next/router';
import Header from "@components/header";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/home">
        Uber Eats mais cesi
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


export default function SignUp() {
  const router = useRouter();

  const getUser = useSelector(getUserState);


  const [data, setData] = useState({
    password: "",
    name:"",
    email: "",
    surname:"",
    profilePicture:"",
    phone: "",
    categoryId: 2,
    location : [{address: "test", primary: false}]
  });

  const handleSubmit = async (e: { preventDefault: () => any; }) => {
    e.preventDefault();
    const userData = {
      email: data.email,
      password: data.password,
      name: data.name,
      surname: data.surname,
      profilePicture: data.profilePicture,
      phone: data.phone,
      categoryId: data.categoryId,
      location: data.location[0].address,
    };

    try {
      console.log(userData)
      const response = await axios
      .post("http://25.17.90.197:4000/api/v1/auth/register",userData)
      .then(res => {
        console.log(res.data);
        router.push('http://localhost:3000/login');
      })
      ;
  } catch (err) {
    router.push('http://localhost:3000/register');
  }
  };


  const handleChange = (e: { target: { value: any; name: any; }; }) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };


  return (
    <ThemeProvider theme={theme}>
      <Header></Header>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            S'inscrire
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={data.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="surname"
              label="Surname"
              name="surname"
              autoFocus
              value={data.surname}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone number"
              name="phone"
              autoFocus
              value={data.phone}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="location"
              label="Location"
              type="location"
              id="location"
              value={data.location[0].address}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={data.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={data.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Se souvenir de moi"
            />
            <button className="navbar-menu-sign_up" style={{width: "-webkit-fill-available"}}
              type="submit"
            >
              Valider
            </button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}