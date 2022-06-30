import type { NextPage } from 'next'
import React, { useRef } from "react";
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Link from 'next/link';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const MenuSlide: NextPage = () => {
    const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

    <Link href="/register">
    <div className="navbar-menu-sign_up">Inscription</div>
    </Link>
    <Link href="/login">
      <div className="navbar-menu-sign_in">Connexion</div>
    </Link>
    <Link href="/restaurantsAdmin">
    <div className="navbar-menu-text"><span className="sidemenu-text"> Compte professionel</span></div>
    </Link>
    <Link href="/admin">
    <div className="navbar-menu-text"><span className="sidemenu-text"> Compte technicien</span></div>
    </Link>
    <Link href="/deliveryAdmin">
    <div className="navbar-menu-text"><span className="sidemenu-text"> Devenez coursier-partenaire</span></div>
    </Link>

    <span className="navbar-menu-subtext">Projet élective logiciel 2022 - CESI EATS <br/> DUPONT LORENDEAUX TIAN</span>

    </Box>
  );

  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="navbar-menu"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default MenuSlide;
