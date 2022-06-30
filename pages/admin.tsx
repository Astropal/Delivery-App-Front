import type { NextPage } from 'next'
import '../styles/Home.module.css'
import Card from '@mui/material/Card';
import { Avatar, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "@components/Header";
import AdminSession from "@components/AdminSession";
import AdminProfil from "@components/AdminProfil";

const Admin: NextPage = () => {
  const [category, setCategory] = useState<String>("Profils");

  return (
    <div>
      <Header></Header>
      <div className="main-right-side">
        <h1> Interface d'administration (ACP) </h1>
        <button className="navbar-sign_up" onClick={() => setCategory("Profils")}> Profils </button>
        <button className="navbar-sign_up" onClick={() => setCategory("Sessions")}> Connection logs </button>
      </div>
      {category === "Profils" ? (
        <AdminProfil />
      ) : (
        <AdminSession />
      )}
    </div>
  )
}

export default Admin;
