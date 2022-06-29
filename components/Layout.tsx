import Head from "next/head";
import React, { useRef } from "react";
import MenuSlide from "@components/MenuSlide"
import Footer from "@components/Footer"
import Link from 'next/link'
import { TabsListUnstyled } from "@mui/base";


interface ILayout {
    children: React.ReactNode;
    title: string;
    isAuthPage?: boolean;
    isEditPage?: boolean;
    isRole?: "Client" | "Any";
  }

const Layout: React.FC<ILayout> = ({
  children,
  title,
  isAuthPage = true,
  isRole = "Any",
  isEditPage = false,
}) => {

  return (
    <div className="relative">
      <Head>
        <title>{title} | Uber Eats</title>
      </Head>

      <header className="navbar">
        
      <div className="navbar-side">
        
          { /* Menu */ }

          <MenuSlide></MenuSlide>
         
          { /* Logo */ }
        <Link href="/">
          <img className="navbar-logo" src="/img/logo.png"></img>
        </Link>
        </div>

        { /* Recherche */ }
          <form
            className="navbar-midlle"
          >
            <input
              placeholder="Plats, courses alimentaires, boissons, etc."
              className="navbar-recherche"
              autoComplete="off"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="navbar-recherche-logo"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>

          { /* Connexion */ }
          <div className="navbar-side">
              <Link href="/login">
                <div className="navbar-sign_in">Connexion</div>
              </Link>
              <Link href="/register">
              <div className="navbar-sign_up">Inscription</div>
              </Link>
              <Link href="/admin">
                go admin
              </Link>
          </div>
              

      </header>
      <div>{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
