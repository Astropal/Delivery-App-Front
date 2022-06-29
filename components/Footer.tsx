import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


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
    </div>
  );
};


export default Footer;