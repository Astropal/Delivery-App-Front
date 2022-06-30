import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import zIndex from "@mui/material/styles/zIndex";
import Link from 'next/link';


const Footer = () => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="cookies"
      >
        <DialogTitle id="alert-dialog-title">
          {"Nous utilisons des cookies"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Cliquez sur « Accepter » pour autoriser CESI EATS à utiliser des cookies afin de personnaliser ce site, ainsi qu'à diffuser des annonces et mesurer leur efficacité sur d'autres applications et sites Web, y compris les réseaux sociaux. Personnalisez vos préférences dans les paramètres des cookies ou cliquez sur « Refuser » si vous ne souhaitez pas que nous utilisions des cookies à ces fins. Pour en savoir plus, consultez notre Déclaration relative aux cookies.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            
          <Button className="cookies-refuse" onClick={handleClose}>Refuser</Button>
          <Button className="cookies-accept" onClick={handleClose} autoFocus>
            Accepter
          </Button>
        </DialogActions>
      </Dialog>

      <div className="footer">
        <div style={{width: "70%", marginLeft: "25px"}}>
        <Link href="/">
              <img style={{marginTop: "20px", marginLeft: "0"}} className="navbar-logo" src="/img/logo.png"></img>
            </Link>
            <h5 style={{float: "left", marginBottom: "0"}}>A propos</h5><br/>
            <p style={{float: "left", textAlign: "left",fontSize: "small", marginTop: "5px", textAlign: "justify", marginRight: "15px"}}>Ce projet a pour but de nous faire concevoir, réaliser, déployer, tester et utiliser une plate forme logicielle distribuée. La vocation métier de cette plateforme est la convergence et le traitement des offres commerciales dans le domaine de la restauration. Ce projet comporte tous les éléments techniques étudiés lors de notre 4em d'année d'études, mais également fait appel à l'ensemble des autres notions étudiées lors des années précédentes. Il constitue l'aboutissement technique de nos années d'études en informatique en école d'ingénieurs. Il a pour vocation d'être des plus réalistes et donc, comme dans un projet d'ingénierie en entreprise, nous disposons pour le réaliser de certaines connaissances, mais pas toutes. Il nous faut alors, comme dans un projet réel, nous confronter à des problématiques jusqu'alors inconnues.</p>
        </div>
        <div style={{width: "30%"}}>
            <h5>Informations</h5>
            <Link href="/legal"><button className="navbar-sign_up">Mentions légales</button></Link>
            <Link href="/legal"><button className="navbar-sign_up">Cookies</button></Link>
            <Link href="/legal"><button className="navbar-sign_up">Conditions Générales de Vente et d'Utilisation</button></Link>
        </div>
        <div style={{width: "10%"}}>
            <h5>Social</h5>
            <h6>A VENIR</h6>
        </div>
    </div>
    </div>
  );
};


export default Footer;