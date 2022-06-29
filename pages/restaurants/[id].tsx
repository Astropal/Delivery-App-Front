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
import {faHeart, faTicketSimple, faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import { getArticleState, setArticles, deleteArticles, removeFromCart } from '@src/redux/article.Slicers';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUserState } from '@src/redux/token.Slicers';

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

  const router = useRouter();
  const id = router.query.id;
  const dataLoader = async (): Promise<IRestaurant[]> => {
  const response = await axios.get("http://25.17.90.197:4000/api/v1/restaurants/"+ [id]);
  const hmm: IRestaurant[] = response as IRestaurant[];
  return new Promise((res) => res(hmm));
  };
  const [data, setData] = useState<IRestaurant[]>([]);
  const produits = data[0]?.articles;
  const getUser = useSelector(getUserState);
  
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

  //------------------------------------------------------------
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

  return (
    <Layout>
       <img className="restaurant-thumbnail" src="/img/products/2.jpeg"></img>
       <div className="main-left-side">
       {data?.map((datum) => (
          <div className="restaurant-info">
              <h1 className="restaurant-title"> {datum.name}</h1>
              <span className="restaurant-subtitle"> {datum.rating} (114 notes) • Américain • € • <FontAwesomeIcon className="product-fas" icon={faTicketSimple}/></span>                            
              <span className="product-subtitle">{datum.deliveryTime}-{datum.deliveryTime! + 10}mins • Frais de livraison : {datum.deliveryTime! >= 15? (delivery_fee = 1.49):(delivery_fee = 0.99) }€</span>
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
                  {produits?.map((datum) => (
                    <li className="products-li" onClick={() => addArticle(datum)}>
                    <div className="products-pos">
                          <a><FontAwesomeIcon className="product-fav" style={{color: "black", height: "30px"}} icon={faCirclePlus}/></a>
                          <a className="products-a">
                            <img className="restaurant-img" src={"/" + datum.picture}></img>
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
          <div>
            {cart && cart.map(cart =>
                        <tr key={cart._id}>
                            <td>{cart.description}</td>
                            <td>{cart.name}</td>
                            <td>{cart.picture}</td>
                            <td>{cart.price}</td>
                        </tr>
            )}
            <button onClick={() => emptyCart()}>Vider le panier</button>
          </div>

       </div>

       </div>
    </Layout>
  )
}

export default restaurant