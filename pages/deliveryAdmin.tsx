import type { NextPage } from 'next'
import '../styles/Home.module.css'
import Card from '@mui/material/Card';
import { Avatar, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleAdmin from '@components/ArticleAdmin';
import MenuAdmin from '@components/MenuAdmin';
import { Restaurant } from '@mui/icons-material';
import ArticleModal from '@components/ArticleModal';
import Header from "@components/Header"
import {io}  from "socket.io-client";

export interface Article {
  _id: string,
  category: string,
  name: string,
  description: string,
  price: number,
  picture: string,
}

export interface IOrder {
  _id: string;
  articles: Article[];
  menus?: [];
  status?: string;
  discount?: Boolean;
  customerId: number;
}


const dataLoader = async (): Promise<IOrder[]> => {
  const response = await axios.get('http://25.17.90.197:4000/api/v1/order/status/preparating');
  const hmm: IOrder[] = response as IOrder[];
  return new Promise((res) => res(hmm));
    
  };

const socket = io('http://localhost:3006');
        
const DeliveryAdmin: NextPage = () => {  

  const [data, setData] = useState<IOrder[]>([]);

    useEffect(() => {
      
      socket.on("connect", () => {
        console.log("Socket connected : ", socket.id);
      });

      socket.on("delivery", (order) => {
        dataLoader().then((res) => {
          console.log(res.data);
          console.log('COUCOU')
          setData(res.data);
        });
      })

      const timer = setTimeout(() => {
          dataLoader().then((res) => {
          setData(res.data);
        });
      }, Math.random() * 1000);
      return () => clearTimeout(timer);
      }, []);
        console.log(data);

    const acceptDelivery = async (id: string) => {
      await axios.put('http://25.17.90.197:4000/api/v1/order/'+id, {
        status: "delivering"
      }).then((res) => {
          console.log(res);
      }).catch(err => {
        console.log(err);
      })
    }

    const refuseDelivery = async (id: string) => {
     var newData = data.filter(item => item._id !== id);
     setData(newData);
    }


  return (
    <>
      <Header></Header>
      <div>
        <h1> Delivery Admin </h1>
        {data.map(order => (
            <div key={order._id}> 
              <h4> Status {order.status} </h4>
              <p>  CustomerID : {order.customerId} </p>
              <button onClick={() => refuseDelivery(order._id)}> x </button>
              <button onClick={() => acceptDelivery(order._id)}> v </button>
            </div>
          ))}
      </div>
    </>
  )
}

export default DeliveryAdmin;



