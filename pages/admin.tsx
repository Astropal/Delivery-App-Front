import type { NextPage } from 'next'
import '../styles/Home.module.css'
import Card from '@mui/material/Card';
import { Avatar, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Session {
  id: number;
  userId: number;
  isAuth: boolean;
  email: string;
  role: string;
  updatedAt: Date;
}

export const dataLoader = async (): Promise<Session[]> => {
  const response = await axios.get('http://localhost:4000/api/v1/permissions/session/all').then((res) => {
    return res.data;
  });
  var test: Session[] = [];
  response.map(e => {
    test.push({
      id: e.id,
      userId: e.userId,
      isAuth: e.isAuth,
      email: e.User.email,
      role: e.User.categoryId,
      updatedAt: new Date(e.updatedAt),
    })
  })
  return new Promise((res) => res(test));
  
};

const Admin: NextPage = () => {

  const [data, setData] = useState<Session[]>([]);

  useEffect(() => {
      const timer = setTimeout(() => {
          dataLoader().then((res) => {
          setData(res);
        });
      }, Math.random() * 1000);
      return () => clearTimeout(timer);
      }, []);


  return (
    <div>
      <h1> Admin </h1>
      <button> Profils </button>
      <button> Connection logs </button>
      <div className="admin-container">
        {data.map(session => (
        <Card key={session.id} className="admin-card">
          <CardHeader
          avatar={<Avatar> {session.email[0]} </Avatar>}
          title={"Identifiant : " + session.userId}
          subheader={
            <p>{session.email}</p>
          }
          action={session.isAuth ? <div className="admin-connected" /> : <div className="admin-disconnected"/>}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Role : {session.role}
            </Typography>
            <Typography> {session.updatedAt.toUTCString()}</Typography>
          </CardContent>
        </Card>
        ))}
      </div>

    </div>
  )
}

export default Admin;
