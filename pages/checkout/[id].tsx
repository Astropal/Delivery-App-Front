import type { NextPage } from 'next'
import React from 'react';
import { useSelector } from 'react-redux';
import { getUserState } from '@src/redux/token.Slicers';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { getArticleState, setArticles, deleteArticles, removeFromCart } from '@src/redux/article.Slicers';
import axios from 'axios';
import {io}  from "socket.io-client";
import { Card } from "@mui/material"
import Header from "@components/Header"

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
const socket = io('http://localhost:3006');

const checkout: NextPage = () => {

  const router = useRouter();
  const id = router.query.id;
  const dataLoader = async (): Promise<IOrder[]> => {
    const response = await axios.get('http://25.17.90.197:4000/api/v1/order/customer/'+[id]);
    const hmm: IOrder[] = response as IOrder[];
    return new Promise((res) => res(hmm));
      
    };

  //---------------------CART-----------------------------------
  var [cart,setCart] = useState<IArticle[]>([]);
  const dispatch = useDispatch();
  const getCart = useSelector(getArticleState);


  const [data, setData] = useState<IOrder[]>([]);

  useEffect(() => {
    if(!router.isReady) return;

    socket.on("connect", () => {
      console.log("Socket connected : ", socket.id);
    });

    socket.on("client", (order) => {
      dataLoader().then((res) => {
        setData(res.data);
      });
    })

    setCart(getCart.articles);
    
    const timer = setTimeout(() => {
        dataLoader().then((res) => {
        console.log(res.data)
        setData(res.data);
      });
    }, Math.random() * 1000);
    return () => clearTimeout(timer);
    }, [router.isReady]);

    const colorStatus = (status: string) => {
      if(status === "pending") return "cart-pending"
      if(status === "accepted") return  "cart-accepted"
      if(status === "delivering") return  "cart-delivering"
      if(status === "rejected") return  "cart-rejected"
      if(status === "delivered") return "cart-delivered"
    }

    const sendOrder = async () => {
      await axios.post('http://25.17.90.197:4000/api/v1/order',{
        articles: cart,
        customerId: id,
        status: "pending",
        discount: false,
        restaurantId: "62bb5479768a46796b873e70",
      }).then((res) => {
        console.log(res.data)
        emptyCart()
      }).catch((err) => {
        console.log(err)
      });
    }

    const endOrder = async (id: string) => {
        await axios.put('http://25.17.90.197:4000/api/v1/order/'+id, {
          status: "delivered"
        }).then(() => {
          dataLoader().then((res) => {
            setData(res.data);
          });
        }).catch(err => {
          console.log(err)
        })
    }

    function emptyCart(){
      cart.length = 0;
      dispatch(deleteArticles(cart));
    }


  return (
    <>
      <Header></Header>
      <div className="checkout-container">
        <div className="checkout-card1">
           <h2> Cart </h2>
          {cart.map((article) => (
            <Card key={article.id} className="cart-card">
              <img src={`http://25.17.90.197:4000/api/v1/cdn/${article.picture}`} alt=""/>
                <div className="cart-card-text">
                <p><strong>{article.name}</strong></p>
                <p>{article.price}€</p>
              </div>
            </Card>
          ))}
          <button className="navbar-sign_up button-cart" onClick={sendOrder}> Commander </button>
        </div>
        <div className="checkout-card2">
        <h2> Commandes </h2>
          {data.map((order) => (
            <Card key={order._id} className="checkout-card-2">
              <div className="checkout-card-header">
                <h4> Status : {order.status} </h4>
                <div className={colorStatus(order.status)}></div>
              </div>
              <div>
                <ul>
                {order.articles.map((article) => (
                  <li key={article._id}>
                    {article.name}
                  </li>  
                ))}
                </ul>
              </div>
              {order.status === "delivering" ? <button className="navbar-sign_up button-cart" onClick={() => {endOrder(order._id)}}> Livré </button> : ""}
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default checkout