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
  const response = await axios.get('http://localhost:4000/api/v1/restaurants/'+id);
  const hmm: IRestaurant = response as IRestaurant;
  return new Promise((res) => res(hmm));
    
  };

const RestaurantsAdmin: NextPage = () => {  

  const [data, setData] = useState<IRestaurant[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            dataLoader().then((res) => {
            setData(res.data[0]);
          });
        }, Math.random() * 1000);
        return () => clearTimeout(timer);
        }, []);
        console.log(data);

        const [images, setImages] = useState([]);

    // Image/File Submit Handler
    function onChangeImage(e: any) {

      if (e.target.files[0] !== null){

          let formData = new FormData();
          formData.append('recfile', e.target.files[0]);
          // the image field name should be similar to your api endpoint field name
          // in my case here the field name is customFile
          console.log('COUCOU')
          axios.post(
              "http://localhost:4000/api/v1/cdn/upload",
              formData,
              {
                  headers: {
                      "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoiYW50aG8iLCJwZXJtaXNzaW9uIjoiMSIsImlhdCI6MTY1NjQ5MzIyNywiZXhwIjoxNjU2NTAwNDI3fQ.ol-BTo4GmBSD2NU6GeDgbpmgxxT8iHg5GrOPtXcXsMQbq8hvNsFFXl-uyZ_XtYT6A0q-QgDQ4j0692fnqt-yEplkiGNV2QMtyW0Pp6fR-arIjXT_fZNet_GV_77PdHxW06EJpfF7iKpkw_EVq7Pu0JNCAk_hVDO1tB5FkLWTrhc",
                  },                    
              }
          )
          .then(res => {
              console.log(res.data);
          })
          .catch(err => {
              console.log(err);
          })
      }
  }


  return (
    <>
      <h1> Restaurants Admin </h1>
      <button> Commandes </button>
      <button> Menus & Articles </button>
      <h2> Menus </h2>
      <MenuAdmin {...data.menus}/>
      <h2> Articles </h2>
      <ArticleAdmin {...data.articles} />
    </>
  )
}

export default RestaurantsAdmin;



