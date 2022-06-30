import type { NextPage } from 'next'
import '../styles/Home.module.css'
import Header from "@components/Header"
import Footer from "@components/Footer"


const legal: NextPage = () => {

  return (
    <div>
      <Header></Header>
      <div style={{marginLeft: "10%", marginRight: "10%", marginTop: "5%", marginBottom: "5%", textAlign: "justify"}}>
      <h1>Politique de confidentialité de CESI Eats</h1>
      <h5>Cette Application collecte certaines Données personnelles de ses Utilisateurs.</h5>
      <h2>Autres informations sur le traitement des Données personnelles</h2>
      <h3>Données personnelles collectées par le biais de sources autres que l’Utilisateur</h3>
      <span>Le Propriétaire de cette Application peut avoir légitimement collecté des Données personnelles relatives aux Utilisateurs à leur insu, en les réutilisant ou en les achetant auprès de tiers pour les motifs mentionnés dans la section spécifiant la base juridique du traitement. <br/> Lorsque le Propriétaire a collecté des Données personnelles de cette manière, les Utilisateurs peuvent trouver des informations spécifiques concernant la source dans les sections correspondantes du présent document ou en contactant le Propriétaire.</span>
      <h3>Cookies de préférence</h3>  
      <span>Cookies de préférence stocke les préférences de l’Utilisateur détectées sur cette Application dans le domaine local, comme, par exemple, son fuseau horaire et sa région.</span>
      <h3>Utilisation de pseudonymes</h3>
      <span>Lors de leur inscription sur cette Application, les Utilisateurs ont l’option d’indiquer un surnom ou un pseudonyme. Dans ce cas, les Données personnelles de l’Utilisateur ne seront pas publiées ou rendues accessibles publiquement. Toute activité accomplie par les Utilisateurs sur cette Application apparaîtront en connexion avec le surnom ou pseudonyme indiqué. Cependant, les Utilisateurs reconnaissent et acceptent que leur activité sur cette Application, et notamment le contenu, l’information ou tout autre matériel pouvant être téléchargé ou partagé sur une base volontaire et intentionnelle peut directement ou indirectement révéler leur identité.</span>
      <h3>sessionStorage</h3>
      <span>sessionStorage permet à cette Application de stocker et d’accéder aux données directement dans le navigateur de l’Utilisateur. Les Données de sessionStorage sont supprimées automatiquement à la fin de la session (autrement dit, lorsque l'onglet du navigateur est fermée).</span>
      <h2>Coordonnées</h2>
      <h3>Propriétaire et Responsable du traitement</h3>
      <span>CESI Eats - 16 Rue Magellan, 31000 Toulouse</span>
      <h3>Courriel de contact du Propriétaire :</h3>
      <span>bastien.dupont@viacesi.fr</span>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default legal;
