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
import Header from "@components/header"


export interface Article {
  _id: string,
  category: string,
  name: string,
  description: string,
  price: number,
  picture: string,
}
export interface Menu {
  articles: Array<Article>,
  total: string
}

export interface IRestaurant {
  _id: number;
  name?: string;
  description?: string;
  picture?: string;
  rating?: string;
  articles: Article[];
  menus: Menu[];
}


const dataLoader = async (): Promise<IRestaurant> => {
  const id = '62bb5479768a46796b873e70';
  const response = await axios.get('http://25.17.90.197:4000/api/v1/restaurants/'+id);
  const hmm: IRestaurant = response as IRestaurant;
  return new Promise((res) => res(hmm));
    
  };

const RestaurantsAdmin: NextPage = () => {  

  const [data, setData] = useState<IRestaurant[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            dataLoader().then((res) => {
            setData(res.data);
          });
        }, Math.random() * 1000);
        return () => clearTimeout(timer);
        }, []);
        console.log(data);

        const [images, setImages] = useState([]);


  return (
    <>
      <Header></Header>
      <div className="main-right-side">
      <h1> Restaurants Admin </h1>
      <button className="navbar-sign_up"> Commandes </button>
      <button className="navbar-sign_up"> Menus & Articles </button>
      </div>
      <div className="product-grid">
      <MenuAdmin {...data.menus}/>
      <ArticleAdmin {...data.articles} />
      </div>
    </>
  )
}

export default RestaurantsAdmin;



