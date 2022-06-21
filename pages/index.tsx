import type { NextPage } from 'next'
import '../styles/Home.module.css'
import Layout from "@components/Layout";
import Category from "@components/Category";
import Products from '@components/Products';
import Food from "@svgs/Food.svg";

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <Category></Category>
        <div className="nocontent">
          <Food />
          <br /><span className="font-semibold">Bientôt des offres ici..</span>
         </div>
      <Products></Products>
    </Layout>
  )
}

export default Home
