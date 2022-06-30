import { useEffect, useState } from 'react';
import { NextPage } from "next"
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import axios from "axios";
import ArticleModal from "@components/ArticleModal"
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
    const response = await axios.get('http://25.17.90.197:4000/api/v1/order/status/accepted');
    const hmm: IOrder[] = response as IOrder[];
    return new Promise((res) => res(hmm));
    };

const socket = io('http://localhost:3006');

const restaurantOrdersAdmin : NextPage = () => {
    const [data, setData] = useState<IOrder[]>([]);

    useEffect(() => {
      
        socket.on("connect", () => {
          console.log("Socket connected : ", socket.id);
        });
  
        socket.on("restaurants", () => {
          dataLoader().then((res) => {
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
        
        const acceptOrder = async (id: string) => {
            await axios.put('http://25.17.90.197:4000/api/v1/order/'+id, {
              status: "preparating"
            }).then(() => {
              dataLoader().then((res) => {
                setData(res.data);
              });
            }).catch(err => {
              console.log(err);
            })
          }
      
          const refuseOrder = async (id: string) =>  {
            await axios.put('http://25.17.90.197:4000/api/v1/order/'+id, {
              status: "rejected"
            }).then(() => {
              dataLoader().then((res) => {
                setData(res.data);
              });
            }).catch(err => {
              console.log(err);
            })
          }

    
          return (
            <>
            <div>
              <h1> Restaurants Commandes </h1>
              {data.map(order => (
                  <div key={order._id}> 
                    <h4> Status {order.status} </h4>
                    <p>  CustomerID : {order.customerId} </p>
                    <button onClick={() => refuseOrder(order._id)}> x </button>
                    <button onClick={() => acceptOrder(order._id)}> v </button>
                  </div>
                ))}
            </div>
          </>
          )
}

export default restaurantOrdersAdmin;
  