//rsc
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchItems } from "../api/fetchItems";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import { Item } from "../types/types";
import styles from "./pokemons.module.css";

const Items = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllItems = async () => {
      setIsLoading(true);
      const allItems = await fetchItems();
      setItems(allItems);
      setIsLoading(false);
    };
    fetchAllItems();
  }, []);

  if (isLoading || items === null) {
    return <LoadingScreen />;
  }
  ///////////////////////////////
  if (items.length > 0) {
    console.log(items);
  }


  //const { url } = items;
  //console.log(url);
  ///////////////////////////////
  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <main>
        <nav>
          {items?.map((item) => (
            <Link
              key={Math.random()}
              className={styles.listItem}
              to={`/pokemons/${item.name}`}
            >
              <img
                className={styles.listItemIcon}
                src={item.sprites}
                alt={item.name}
              />
              <div className={styles.listItemText}>
                <span>{item.name}</span>
                <span>{item.id}</span>
              </div>
            </Link>
          ))}
        </nav>
      </main>
      <Footer />
    </>
  );
};

export default Items;
