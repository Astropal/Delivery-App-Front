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


const theme = createTheme();


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


export default function Modify() {
const router = useRouter();

function home(){
    router.push("http://localhost:3000");
}

function parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

  const userDataId = parseJwt(useSelector(getUserState).token)._id;
  const [data, setData] = useState({
    password: "",
    name:"",
    email: "",
    surname:"",
    profilePicture:"",
    phone: "",
    categoryId: 2,
    location: [{address:"test", primary: true}]
  });

  function getUser(){
     axios
      .get("http://25.17.90.197:4000/api/v1/user/" + userDataId)
      .then(res => {
        const user = res.data;
        setData(user);
        console.log(user);
        
      })
      ;
  }

  React.useEffect(
    ()=>getUser(),[])





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
      location: data.location[0].address
    };

    try {
      console.log(userData)
      const response = await axios
      .put("http://25.17.90.197:4000/api/v1/user/" + userDataId ,userData)
      .then(res => {
        console.log(response);
        //router.push('http://localhost:3000/login');
      })
      ;
  } catch (err) {
    //router.push('http://localhost:3000/register');
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Link href="/">
          <svg xmlns="http://www.w3.org/2000/svg" height="40" width="145" viewBox="0.19000000000000128 0.25 367.46 61.17460741747068">
            <g fill="none">
              <path fill="#05c167" d="M194.32.25h40.87v10h-29.83v14.2h29v9.66h-29v14.44h29.83v10h-40.87zM348.06 59.6c12.53 0 19.59-6 19.59-14.24 0-5.87-4.18-10.25-12.93-12.15l-9.25-1.89c-5.37-1-7.06-2-7.06-4 0-2.59 2.59-4.18 7.36-4.18 5.17 0 9 1.39 10 6.17h10.84c-.59-9-7.06-14.94-20.18-14.94-11.34 0-19.3 4.68-19.3 13.75 0 6.27 4.38 10.35 13.83 12.34l10.34 2.39c4.08.8 5.17 1.9 5.17 3.59 0 2.69-3.08 4.38-8.06 4.38-6.26 0-9.84-1.39-11.23-6.17h-10.9c1.59 8.98 8.25 14.95 21.78 14.95zm-24.93-1.09H311.4c-7.36 0-11.44-4.58-11.44-10.36v-22.9h-8.25v-9.76H300V3.24h10.9v12.25h12.23v9.76H310.9v20.11c0 2.29 1.59 3.39 4.08 3.39h8.15zm-47-43v3.88a21.16 21.16 0 0 0-13.73-5 22.61 22.61 0 1 0 0 45.21 21.1 21.1 0 0 0 13.73-5v3.89H287v-43zM263.3 50.16a13.15 13.15 0 1 1 13-13.14 13 13 0 0 1-13.02 13.12z"></path>
              <path fill="#000" d="M170.06 23.56c-5.47 0-9.35 4.28-9.35 10.85v24.1h-8.35V16.09h8.25v5.18a11.19 11.19 0 0 1 9.94-5.48h3v7.77zM146.59 37.3c0-12.65-9-22.11-21.18-22.11a21.83 21.83 0 0 0-21.68 22.11c0 12.64 9.75 22.2 22.47 22.2a22.17 22.17 0 0 0 18.3-9.06L138.44 46a14.78 14.78 0 0 1-12.24 6.17 14.22 14.22 0 0 1-14-12.14h34.41zm-34.21-3.89c1.49-6.47 6.66-10.85 12.93-10.85s11.43 4.38 12.83 10.85zm-35.1-18.22a21.12 21.12 0 0 0-15 6.27V.25h-8.35v58.26h8.25v-5.38A21.45 21.45 0 0 0 77.3 59.5a22.16 22.16 0 1 0 0-44.31zm-.6 36.85A14.69 14.69 0 1 1 91.3 37.4 14.58 14.58 0 0 1 76.68 52zm-53.5-.4c8.06 0 14.32-6.18 14.32-15.44V.25h8.65v58.26H37.6V53a21.24 21.24 0 0 1-15.41 6.47c-12.43 0-22-9.06-22-22.8V.25H9v36c0 9.31 6 15.39 14.18 15.39z"></path>
            </g>
          </svg>
          </Link>
          <Typography component="h1" variant="h5">
            Modifier le compte
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
              id="pictureUrl"
              label="Picture"
              name="picture"
              autoFocus
              value={data.profilePicture}
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
              name="categoryId"
              label="Category"
              type="categoryId"
              id="categoryId"
              value={data.categoryId}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="location"
              label="location"
              type="location"
              id="location"
              value={data.location}
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Se souvenir de moi"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Modifier
            </Button>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Accueil
            </Button>

          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}