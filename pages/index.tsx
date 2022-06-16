import type { NextPage } from 'next'
import '../styles/Home.module.css'
import Layout from "@components/Layout";
import Category from "@components/Category";
import Food from "@svgs/Food.svg";

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <Category></Category>
        <div className="nocontent">
          <Food />
          <br /><span className="font-semibold">Veuillez réessayer après vous être connecté.</span>
         </div>
    </Layout>
  )
}

export default Home
