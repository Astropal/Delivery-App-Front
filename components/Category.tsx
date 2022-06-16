import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import Layout from "@components/Layout";
import Food from "@svgs/Food.svg";
import ctg from "../src/product_ctg.json";

interface ICategory {
    id: number;
    name?: string;
    img?: string;
  }

const Category: NextPage = () => {
    console.log(ctg)

    const dataLoader = (): Promise<ICategory[]> => {
        const hmm: ICategory[] = ctg as ICategory[];
        return new Promise((res) => res(hmm));
    };

    const [data, setData] = useState<ICategory[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            dataLoader().then((res) => {
            setData(res);
          });
        }, Math.random() * 1000);
        return () => clearTimeout(timer);
      }, []);

  return (
    <div className="root-cat">
        <br/>
        <nav className="nav-cat">
            <ul className="ul-cat">
                
                {data.map((datum) => (
                    <li className="il-cat">
                        <a className="a-cat" href={"/" + datum.id}>
                            <div className="circle-cat">
                                <img className="image-cat" src={datum.img}></img>
                                <span className="span-cat">
                                    <div className="span-div-cat">{datum.name}</div>
                                </span>
                            </div>
                        </a>
                    </li>
                ))}
                        
            </ul>
        </nav>
        <div className="sep-cat"></div>
    </div>
  )
}

export default Category
