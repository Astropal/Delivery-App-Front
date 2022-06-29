import type { NextPage } from 'next'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart, faTag, faMedal,} from "@fortawesome/free-solid-svg-icons";
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const marks = [
  {
    value:0,
    label: '3€',
  },
  {
    value: 1,
    label: '5€',
  },
  {
    value: 2,
    label: '7€',
  },
  {
    value: 3,
    label: '+7€',
  },
];

const Thumbnail: NextPage = () => {
   
  return (
    <div className="sidemenu-section">
       <div className="sidemenu-title">Trier
          <div className="sidemenu-inline-section"><a className="sidemenu-dot">•</a><span className="sidemenu-text"> Choisi pour vous (par défaut)</span></div>
          <div className="sidemenu-inline-section"><a className="sidemenu-dot">•</a><span className="sidemenu-text"> Les plus populaires</span></div>
          <div className="sidemenu-inline-section"><a className="sidemenu-dot">•</a><span className="sidemenu-text"> Note</span></div>
          <div className="sidemenu-inline-section"><a className="sidemenu-dot">•</a><span className="sidemenu-text"> Délai de livraison</span></div>
       </div>
       <div className="sidemenu-title">Par Cesi Eats
          <div className="sidemenu-inline-section">
            <FontAwesomeIcon className="sidemenu-fas" icon={faTag}/>
            <span className="sidemenu-text"> Offres</span>
            <Switch {...label} />
          </div>
          <div className="sidemenu-inline-section">
               <FontAwesomeIcon className="sidemenu-fas" icon={faMedal}/>
               <span className="sidemenu-text"> Le Meilleur de Cesi Eats</span>
               <Switch {...label} />
            </div>
       </div>
       <div className="sidemenu-title">Fourchette de prix
        <Slider className="sidemenu-slider" defaultValue={3} step={1} marks min={0} max={3} marks={marks}/>
       </div>
       <div className="sidemenu-title">Frais de livraison maximaux
        <div className="sidemenu-sub-section">
          <div className="sidemenu-perprice">€</div>
          <div className="sidemenu-perprice">€€</div>
          <div className="sidemenu-perprice">€€€</div>
          <div className="sidemenu-perprice">€€€€</div>
        </div>
       </div>
       <div className="sidemenu-title">Diététique
        <div className="sidemenu-sub-section">
            <div className="sidemenu-tag">Végétarien</div>
            <div className="sidemenu-tag">Vegan</div>
            <div className="sidemenu-tag">Sans gluten</div>
            <div className="sidemenu-tag">Halal</div>
            <div className="sidemenu-tag">Adapté aux allergies alimentaires</div>
          </div>
       </div>
    </div>
  )
}

export default Thumbnail
