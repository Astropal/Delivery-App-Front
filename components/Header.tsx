import React, { useRef } from "react";
import Link from 'next/link'
import MenuSlide from "@components/MenuSlide"


const Header = () => {

  return (
    <div className="header-box">
        
        { /* Menu */ }

        <div className="MenuSlide">
        <MenuSlide></MenuSlide>
        </div>

        { /* Logo */ }
      <Link href="/">
        <img className="navbar-logo" src="/img/logo_white.png"></img>
      </Link>
    </div>
  );
};

export default Header;
