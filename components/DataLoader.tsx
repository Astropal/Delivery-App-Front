import { useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart, faTicketSimple} from "@fortawesome/free-solid-svg-icons";

interface IProducts_back {
    _id: number;
    name?: string;
    description?: string;
    picture?: string;
    rating?: string;
    offer?: boolean;
    deliveryTime?: number;
  }

export const dataLoader = async (): Promise<IProducts_back[]> => {
    const response = await axios.get('http://25.17.90.197:4000/api/v1/restaurants');
    const hmm: IProducts_back[] = response as IProducts_back[];
    return new Promise((res) => res(hmm));
    
};

const DataLoader = () => {

    const [data, setData] = useState<IProducts_back[]>([]);
    let delivery_fee = 0;

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
    <div className="products-section">
                <div className="products-box">
                {data.map((datum) => (
                        <li key={datum._id} className="products-li">
                            <div className="products-pos">
                                 <a className="products-a" href={"/restaurants/" + datum._id}>
                                    <img className="products-img" src={datum.picture}></img>
                                    <div className="products-info">
                                        <h3 className="product-title">{datum.name}</h3>  
                                        <span className="product-rate">{datum.rating}</span>
                                        <span className="product-subtitle"><FontAwesomeIcon className="product-fas" icon={faTicketSimple}/> • Frais de livraison : {datum.deliveryTime! >= 15? (delivery_fee = 1.49):(delivery_fee = 0.99) }€ • {datum.deliveryTime}-{datum.deliveryTime! + 10}mins</span>
                                    </div>
                                </a>
                            </div>
                        </li>
                    ))}
                </div>
            </div>
  );
};


export default DataLoader;