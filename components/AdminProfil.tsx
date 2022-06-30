import type { NextPage } from 'next'
import '../styles/Home.module.css'
import Card from '@mui/material/Card';
import { Avatar, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "@components/Header"

interface User {
  id: number;
  name: string;
  email: string;
  profilePicture: string;
  phone: string;
  surname: string;
  isSuspended: boolean;
  categoryId: number;
  isDeleted: boolean;
}

export const dataLoader = async (): Promise<User[]> => {
  const response = await axios.get('http://25.17.90.197:4000/api/v1/user/all').then((res) => {
    return res.data;
  });
  var test: User[] = response;
  return new Promise((res) => res(test));
  
};



const AdminProfil: NextPage = () => {
    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            dataLoader().then((res) => {
            setData(res);
          });
        }, Math.random() * 1000);
        return () => clearTimeout(timer);
        }, []);

        console.log(data)
            
    return (
        <div className="admin-container">
        {data.map(user => (
        <Card key={user.id} className="admin-card">
        <CardHeader
        avatar={<Avatar> {user.email[0]} </Avatar>}
        title={"Identifiant : " + user.id}
        subheader={
            <>
                <p>{user.email}</p>
                
            </>
        }
        />
        <CardContent className="admin-profils">
            <Typography variant="body2" color="textSecondary" component="p">
            {user.name} {user.surname} 
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            Téléphone : {user.phone} 
            </Typography>
            Role : {user.categoryId}
        </CardContent>
        </Card>
        ))}
    </div>
    )
}

export default AdminProfil;