import Link from "next/link";
import styles from "./homePage.module.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Featured from "./components/featured/Featured";
import CategoryList from "./components/categoryList/CategoryList";
import Activities from "./components/activities/Activities";
import CardList from "./components/cardList.jsx/CardList";
import Menu from "./components/menu/Menu";

export default function Home({searchParams}) {
    const page = parseInt(searchParams.page) || 1;
    const { cat } = searchParams;
  
    return (
        <div className={styles.container}>
            <Featured />
            <CategoryList />
            <Activities page={page} cat={cat}/>
            <div className={styles.content}>
                <CardList page={page} cat={cat}/>
                <Menu />
            </div>
        </div>
    )
}