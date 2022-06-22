import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import thumbnail_offers from "../src/thumbnail_offer.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart, faTicketSimple, faCoffee,} from "@fortawesome/free-solid-svg-icons";

interface IThumbnail {
    id: number;
    name?: string;
    description?: string;
    img?: string;
    color?: string;
    button?: boolean;
  }

const Thumbnail: NextPage = () => {
    console.log(thumbnail_offers)

    const dataLoader = (): Promise<IThumbnail[]> => {
        const hmm: IThumbnail[] = thumbnail_offers as IThumbnail[];
        return new Promise((res) => res(hmm));
    };

    const [data, setData] = useState<IThumbnail[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            dataLoader().then((res) => {
            setData(res);
          });
        }, Math.random() * 1000);
        return () => clearTimeout(timer);
      }, []);

  return (
    <div className="thumbnail-section">
        {data.map((datum) => (
            <div className="thumbnail-box">
                <div style={{backgroundColor: datum.color!}} className="thumbnail">
                    <a className="thumbnail-a">
                        <img className="thumbnail-img" src={datum.img}></img>
                        {datum.name?
                            (
                                <div>
                                    <span className='thumbnail-title'>{datum.name}</span>
                                    <span className='thumbnail-subtitle'>{datum.description!}</span>
                                </div>
                            ):(<></>)
                        }
                        {datum.button? (
                            <div className="thumbnail-button">Voyons voir !</div>
                        ):(<></>)
                        
                        }
                    </a>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Thumbnail
