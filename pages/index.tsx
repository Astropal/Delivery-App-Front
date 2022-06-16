import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from "@components/Layout";
import Food from "@svgs/Food.svg";

const Home: NextPage = () => {
  return (
    <Layout title="Home">
        <div className="nocontent">
          <Food />
          <br /><span className="font-semibold">Veuillez réessayer après vous être connecté.</span>
        </div>
    </Layout>
  )
}

export default Home
