import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
import Layout from "@components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart, faTicketSimple, faCirclePlus, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import { getArticleState, setArticles, deleteArticles, removeFromCart } from '@src/redux/article.Slicers';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUserState } from '@src/redux/token.Slicers';
import Popover from "@mui/material/Popover";
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React from 'react';

interface IArticle{
  _id: string;
  name: string;
  description: string;
  picture: string;
  price: string;
}

interface IRestaurant {
  _id: number;
  name?: string;
  description?: string;
  picture?: string;
  rating?: string;
  articles?: IArticle[];
  offer?: boolean;
  deliveryTime?: number;
}


const restaurant: NextPage = () => {

  function parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};



  const router = useRouter();
  const id = router.query.id;
  const dataLoader = async (): Promise<IRestaurant[]> => {
  const response = await axios.get("http://25.17.90.197:4000/api/v1/restaurants/"+ [id]);
  const hmm: IRestaurant[] = response as IRestaurant[];
  return new Promise((res) => res(hmm));
  };
  const [data, setData] = useState<IRestaurant[]>([]);
  const produits = data[0]?.articles;
  const userDataId = parseJwt(useSelector(getUserState).token)._id;
  
  let delivery_fee = 0;

  useEffect(() => {
      const timer = setTimeout(() => {
          dataLoader().then((res) => {
          setData(res.data);
        });
      }, Math.random() * 1000);
      console.log(getCart.articles);
      setCart(getCart.articles);
      return () => clearTimeout(timer);
      }, []);


  console.log(data[0]?.articles);

  //---------------------CART-----------------------------------
  var [cart,setCart] = useState<IArticle[]>([]);
  const dispatch = useDispatch();
  const getCart = useSelector(getArticleState);

  function addArticle(temp){
    cart.push(temp);
    dispatch(setArticles(temp));
    console.log(cart);
    console.log(getCart.articles);
  }

  function removeArticle(temp){
    const index = cart.findIndex((temp) => temp);
    cart.splice(index, 1);
    dispatch(removeFromCart(temp));
    console.log(cart);
    console.log(getCart.articles);
  }

  function emptyCart(){
    cart.length = 0;
    dispatch(deleteArticles(cart));
    console.log(cart);
    console.log(getCart.articles);
  }

  //------------------POPOVER-----------------------------------

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idpop = open ? 'simple-popover' : undefined;

  return (
    <Layout>
      {data?.map((datum) => (
       <div>
        <img className="restaurant-thumbnail" src={"/" + datum.picture}></img>
        <div className="main-left-side">
            <div className="restaurant-info">
                <h1 className="restaurant-title"> {datum.name}</h1>
                <span className="restaurant-subtitle"> {datum.rating} (114 notes) • Américain • € • <FontAwesomeIcon className="product-fas" icon={faTicketSimple}/></span>                            
                <span className="product-subtitle">{datum.deliveryTime}-{datum.deliveryTime! + 10}mins • Frais de livraison : {datum.deliveryTime! >= 15? (delivery_fee = 1.49):(delivery_fee = 0.99) }€</span>
                <br/><span className="product-subtitle">Appuyez pour connaître les horaires, l'adresse et d'autres informations.</span>                            
            </div>
        </div>
       </div>
       ))}
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
        <button aria-describedby={idpop} onClick={handleClick} className="navbar-sign_up" style={{right: "0"}}><FontAwesomeIcon icon={faCartShopping}/> Panier • {cart.length}</button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>Votre panier :

          <div>
              {cart && cart.map(cart =>
                          <tr key={cart._id}>
                              <td className="cart-text">x1 </td>
                              <td><img className="cart-img" src={"http://25.17.90.197:4000/api/v1/cdn/" + cart.picture}></img></td>
                              <td className="cart-text">{cart.price}€</td>
                          </tr>
              )}
            </div>
          <button className="navbar-sign_up" onClick={() => emptyCart()}>Vider le panier</button>
          <Link href={"/checkout/" + userDataId}><button className="navbar-sign_up">Payer</button></Link>
          </Typography>
        </Popover>
        <h1>Catégorie 1</h1>
        <div className="products-section">
            <div className="products-box">
                {produits?.map((datum) => (
                  <li className="products-li" onClick={() => addArticle(datum)}>
                  <div className="products-pos">
                        <a><FontAwesomeIcon className="product-fav" style={{color: "black", height: "30px"}} icon={faCirclePlus}/></a>
                        <a className="products-a">
                          <img className="restaurant-img" src={"http://25.17.90.197:4000/api/v1/cdn/" + datum.picture}></img>
                          <div className="products-info">
                              <h3 className="product-title">{datum.name}</h3>
                              <span className="product-subtitle">{datum.price + "€"}</span>
                          </div>
                        </a>
                  </div>
                </li>
              ))}
            </div>
        </div>
       </div>

       </div>
    </Layout>
  )
}

export default restaurant