import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import Layout from "@components/Layout";
import Food from "@svgs/Food.svg";
import products from "../src/products.json";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart, faHeartCircleBolt, faCoffee,} from "@fortawesome/free-solid-svg-icons";

interface IProducts {
    id: number;
    name?: string;
    img?: string;
    rate?: string;
    fav?: boolean;
    offer?: boolean;
  }

const Products: NextPage = () => {
    console.log(products)

    const dataLoader = (): Promise<IProducts[]> => {
        const hmm: IProducts[] = products as IProducts[];
        return new Promise((res) => res(hmm));
    };

    const [data, setData] = useState<IProducts[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            dataLoader().then((res) => {
            setData(res);
          });
        }, Math.random() * 1000);
        return () => clearTimeout(timer);
      }, []);

  return (
    <div className="product-grid">
        <div className="main-left-side">
            <div className="products-menu">
                <div className="products-menu-temp"></div>
            </div>
        </div>
        <div className="main-right-side">
        <h1>Offres du jour</h1>
            <div className="products-section">
                <div className="products-box">
                
                    {data.map((datum) => (
                        <li className="products-li">
                            <div className="products-pos">
                                <a href={"/" + datum.id}><FontAwesomeIcon className="product-fas" icon={faHeart}/></a>
                                <a className="products-a" href={"/" + datum.id}>
                                    {datum.offer?
                                        (<div className="product-offer-rub">
                                            <span className='product-offer'>1 acheté(s) = 1 offert(s)</span>
                                        </div>):(<span></span>)
                                    }
                                    <img className="products-img" src={datum.img}></img>
                                    <div className="products-info">
                                        <h3 className="product-title">{datum.name}</h3>  
                                        <span className="product-rate">{datum.rate}</span>
                                    </div>
                                </a>
                            </div>
                        </li>
                    ))}
                            
                </div>
            </div>
        </div>
    </div>
  )
}

export default Products
