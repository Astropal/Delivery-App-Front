import { useEffect, useState } from 'react';
import { NextPage } from "next"
import { Box, Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import axios from "axios";
import ArticleModal from "@components/ArticleModal"
import {io}  from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";

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
  
  
  const dataLoaderPending = async (): Promise<IOrder[]> => {
    const response = await axios.get('http://25.17.90.197:4000/api/v1/order/status/pending');
    const hmm: IOrder[] = response as IOrder[];
    return new Promise((res) => res(hmm));
    };
  const dataLoaderAccepted = async (): Promise<IOrder[]> => {
    const response = await axios.get('http://25.17.90.197:4000/api/v1/order/status/accepted');
    const hmm: IOrder[] = response as IOrder[];
    return new Promise((res) => res(hmm));
    };
  const dataLoaderDelivering = async (): Promise<IOrder[]> => {
    const response = await axios.get('http://25.17.90.197:4000/api/v1/order/status/delivering');
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
          dataLoaderPending().then((res) => {
            setData(res.data);
            dataLoaderAccepted().then((res2) => {
              dataLoaderDelivering().then(res3 => {
                let datas = res.data.concat(res2.data);
                datas.concat(res3.data);
                setData(datas);
              })
            })
          });
        })
  
        const timer = setTimeout(() => {
          dataLoaderPending().then((res) => {
            setData(res.data);
            dataLoaderAccepted().then((res2) => {
              dataLoaderDelivering().then(res3 => {
                let datas = res.data.concat(res2.data);
                datas.concat(res3.data);
                setData(datas);
              })
            })
          });
        }, Math.random() * 1000);
        return () => clearTimeout(timer);
        }, []);
        
        const acceptOrder = async (id: string) => {
            await axios.put('http://25.17.90.197:4000/api/v1/order/'+id, {
              status: "accepted"
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
              <div className="main-right-side">
                <h1> Restaurants Commandes </h1>
                <div className="products-section">
                  <div className="products-box">
                    {data.map(order => (

                        <Card key={order._id} className="admin-card" style={{border: "0", width: "40%", marginRight: "15px"}}>
                        <CardHeader
                        title={"Status : " + order.status}
                        subheader={
                          <>
                          <p>Référence de commande : {order._id}</p>
                          <p>CustomerID : {order.customerId}</p>
                          </>
                        }
                        />
                        <button className="admin-decline" onClick={() => refuseOrder(order._id)}><FontAwesomeIcon icon={faXmark}/></button>
                        <button className="admin-validate" onClick={() => acceptOrder(order._id)}><FontAwesomeIcon icon={faCheck}/></button>
                        </Card>
                        ))}
                  </div>
                </div>
              </div>
            </div>
          </>
          )
}

export default restaurantOrdersAdmin;
  