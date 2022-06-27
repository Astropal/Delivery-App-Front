import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
import Layout from "@components/Layout";
import Category from "@components/Category";
import Products from '@components/Products';
import Thumbnail from "@components/Thumbnail";
import Food from "@svgs/Food.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart, faTicketSimple} from "@fortawesome/free-solid-svg-icons";

interface IRestaurant {
  _id: number;
  name?: string;
  description?: string;
  picture?: string;
  rating?: string;
}

const restaurant: NextPage = () => {

  const router = useRouter();
  const id = router.query.id;
  const dataLoader = async (): Promise<IRestaurant[]> => {
  const response = await axios.get("http://localhost:4000/api/v1/restaurants/"+ [id]);
  const hmm: IRestaurant[] = response as IRestaurant[];
  return new Promise((res) => res(hmm));
    
  };

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


  return (
    <Layout>
       <img className="restaurant-thumbnail" src="/img/products/2.jpeg"></img>
       <div className="main-left-side">
       {data.map((datum) => (
          <div className="restaurant-info">
              <h1 className="restaurant-title"> {datum.name}</h1>
              <span className="restaurant-subtitle"> {datum.rating} (114 notes) • Américain • € • <FontAwesomeIcon className="product-fas" icon={faTicketSimple}/></span>                            
              <span className="product-subtitle">10-20mins • Frais de livraison : 0.99€</span>
              <br/><span className="product-subtitle">Appuyez pour connaître les horaires, l'adresse et d'autres informations.</span>                            
          </div>
        ))}
       </div>
       <div className="product-grid">
       <div className="main-left-side">
       <div className="sidemenu-section">
          <span className="restaurant-desc"> Catégorie 1</span>
          <span className="restaurant-desc"> Catégorie 2</span>
          <span className="restaurant-desc"> Catégorie 3</span>
          <span className="restaurant-desc"> Catégorie 4</span>
          <span className="restaurant-desc"> Catégorie 5</span>
          <span className="restaurant-desc"> Catégorie 6</span>
          <span className="restaurant-desc"> Catégorie 7</span>
          <span className="restaurant-desc"> Catégorie 8</span>
          <span className="restaurant-desc"> Catégorie 9</span>
          <span className="restaurant-desc"> Catégorie 10</span>
          <span className="restaurant-desc"> Catégorie 11</span>
       </div>
       </div>
       <div className="main-right-side">

          <h1>Catégorie 1</h1>
          <div className="products-section">
              <div className="products-box">
                          <li className="products-li">
                            <div className="products-pos">
                                  <a href={"/"}><FontAwesomeIcon className="product-fav" icon={faHeart}/></a>
                                  <a className="products-a" href={"/"}>
                                    <img className="restaurant-img" src={"/img/products/2.jpeg"}></img>
                                    <div className="products-info">
                                        <h3 className="product-title">Titre Produit</h3>
                                        <span className="product-subtitle">3,00€</span>
                                    </div>
                                  </a>
                            </div>
                          </li>

                          <li className="products-li">
                            <div className="products-pos">
                                  <a href={"/"}><FontAwesomeIcon className="product-fav" icon={faHeart}/></a>
                                  <a className="products-a" href={"/"}>
                                    <img className="restaurant-img" src={"/img/products/2.jpeg"}></img>
                                    <div className="products-info">
                                        <h3 className="product-title">Titre Produit</h3>
                                        <span className="product-subtitle">3,00€</span>
                                    </div>
                                  </a>
                            </div>
                          </li>


              </div>
          </div>

       </div>

       </div>
    </Layout>
  )
}

export default restaurant