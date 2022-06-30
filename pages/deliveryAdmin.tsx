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


const dataLoaderAccepted = async (): Promise<IOrder[]> => {
  const response = await axios.get('http://25.17.90.197:4000/api/v1/order/status/accepted');
  const hmm: IOrder[] = response as IOrder[];
  return new Promise((res) => res(hmm));
  };

  const dataLoaderDelivering = async () : Promise<IOrder[]> => {
    const response = await axios.get('http://25.17.90.197:4000/api/v1/order/status/delivering');
  const hmm: IOrder[] = response as IOrder[];
  return new Promise((res) => res(hmm));
  };

  const dataLoaderDelivered = async () : Promise<IOrder[]> => {
    const response = await axios.get('http://25.17.90.197:4000/api/v1/order/status/delivered');
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
        dataLoaderAccepted().then((res) => {
          setData(res.data);
          dataLoaderDelivering().then((res2) => {
            dataLoaderDelivered().then(res3 => {
              let datas = res.data.concat(res2.data);
              datas.concat(res3.data);
              setData(datas);
            })
          })
        });
      })

      const timer = setTimeout(() => {
        dataLoaderAccepted().then((res) => {
          setData(res.data);
          dataLoaderDelivering().then((res2) => {
            dataLoaderDelivered().then(res3 => {
              let datas = res.data.concat(res2.data);
              datas.concat(res3.data);
              setData(datas);
            })
          })
        });
      }, Math.random() * 1000);
      return () => clearTimeout(timer);
      }, []);
        console.log(data);

    const acceptDelivery = async (id: string) => {
      await axios.put('http://25.17.90.197:4000/api/v1/order/'+id, {
        status: "delivering"
      }).then(() => {
        dataLoaderAccepted().then((res) => {
          setData(res.data);
          dataLoaderDelivering().then((res2) => {
            dataLoaderDelivered().then(res3 => {
              let datas = res.data.concat(res2.data);
              datas.concat(res3.data);
              setData(datas);
            })
          })
        });
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
        <div className="main-right-side">
          <h1> Livreurs Commandes </h1>
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
                  <button className="admin-decline" onClick={() => refuseDelivery(order._id)}><FontAwesomeIcon icon={faXmark}/></button>
                  <button className="admin-validate" onClick={() => acceptDelivery(order._id)}><FontAwesomeIcon icon={faCheck}/></button>
                  </Card>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeliveryAdmin;



