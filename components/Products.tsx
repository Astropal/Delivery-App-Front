import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import products from "../src/products.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart, faTicketSimple, faCoffee,} from "@fortawesome/free-solid-svg-icons";

interface IProducts {
    id: number;
    name?: string;
    img?: string;
    rate?: string;
    fav?: boolean;
    offer?: boolean;
    delivery_time?: number;
  }

const Products: NextPage = () => {
    console.log(products)

    const dataLoader = (): Promise<IProducts[]> => {
        const hmm: IProducts[] = products as IProducts[];
        return new Promise((res) => res(hmm));
    };

    const [data, setData] = useState<IProducts[]>([]);
    const default_time = 15;
    let delivery_fee = 0;
    let displaying = false;

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
                        <> {datum.offer? (
                        <li className="products-li">
                            <div className="products-pos">
                                <a href={"/" + datum.id}><FontAwesomeIcon className="product-fav" icon={faHeart}/></a>
                                <a className="products-a" href={"/" + datum.id}>
                                    {datum.offer?
                                        (<div className="product-offer-rub">
                                            <span className='product-offer'>1 acheté(s) = 1 offert(s)</span>
                                        </div>): null
                                    }
                                    <img className="products-img" src={datum.img}></img>
                                    <div className="products-info">
                                        <h3 className="product-title">{datum.name}</h3>  
                                        <span className="product-rate">{datum.rate}</span>
                                        <span className="product-subtitle"><FontAwesomeIcon className="product-fas" icon={faTicketSimple}/> • Frais de livraison : {datum.delivery_time! >= 15? (delivery_fee = 1.49):(delivery_fee = 0.99) }€ • {datum.delivery_time}-{datum.delivery_time! + 10}mins</span>
                                    </div>
                                </a>
                            </div>
                        </li>
                        ):null}
                        </>      
                    ))}

                    
                </div>
            </div>
        <h1>Nouveau sur Uber Eats</h1>
        <div className="products-section">
                <div className="products-box">
                
                    {data.map((datum) => (
                        <li className="products-li">
                            <div className="products-pos">
                                <a href={"/" + datum.id}><FontAwesomeIcon className="product-fav" icon={faHeart}/></a>
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
                                        <span className="product-subtitle"><FontAwesomeIcon className="product-fas" icon={faTicketSimple}/> • Frais de livraison : {datum.delivery_time! >= 15? (delivery_fee = 1.49):(delivery_fee = 0.99) }€ • {datum.delivery_time}-{datum.delivery_time! + 10}mins</span>
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
