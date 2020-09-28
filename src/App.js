import React, { useEffect, useState } from "react";
import { fetchAllCategories, fetchCategoryData } from "./api";
import "./App.css";
import Cards from "./components/Cards";
import Navigation from "./components/Navigation";
import { useNavigation } from "./hooks/useNavigation";
import Search from "./components/Search";

function App() {
  const [category, setCategory] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [filteredCardData, setFilteredCardData] = useState([]);
  const [currentNavIndex, setCurrentNavIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);
  const [isNavActive, setIsNavActive] = useState(true);
  const [search, setSearch] = useState("");

  const [current, setNavigation] = useNavigation({
    onUpKey: () => setCurrentCardIndex((i) => (i > -1 ? i - 1 : i)),
    onDownKey: (len) => {
      setCurrentCardIndex((i) => (len > i ? i + 1 : i));
      setIsNavActive(false);
    },
    onLeftKey: (len) => setCurrentNavIndex((i) => (i === 0 ? len - 1 : i - 1)),
    onRightKey: (len) =>
      setCurrentNavIndex((i) => (i + 1 > len - 1 ? 0 : i + 1)),
  });

  useEffect(() => {
    async function fetchData() {
      const categories = await fetchAllCategories();
      setCategory(categories);
      const firstCategoryData = await fetchCategoryData(categories[0].link);
      setCardData(firstCategoryData);
      setFilteredCardData(firstCategoryData);
      current.allCategoriesLength = categories.length;
      current.cardLength = firstCategoryData.length;
      setNavigation(current);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (currentCardIndex === -1) {
      setIsNavActive(true);
      current.navigationType = "nav";
      setNavigation(current);
    }
  }, [currentCardIndex]);

  useEffect(() => {
    async function fetchData() {
      const categoryData = await fetchCategoryData(
        category[currentNavIndex].link
      );
      setCardData(categoryData);
      setFilteredCardData(categoryData);
      current.cardLength = categoryData.length;
      setNavigation(current);
    }
    current.navigationType === "nav" &&
      category[currentNavIndex] &&
      fetchData();
  }, [currentNavIndex]);

  const onSearch = (search) => {
    const filteredArray = cardData.filter((i) => {
      return i.title.toLowerCase().match(search);
    });
    setFilteredCardData(filteredArray);
  };

  return (
    <div className="App">
      <Search onSearch={onSearch} />
      <Navigation
        category={category}
        currentNavIndex={currentNavIndex}
        isNavActive={isNavActive}
      />
      <Cards
        categoryData={filteredCardData}
        currentCardIndex={currentCardIndex}
      />
    </div>
  );
}

export default App;
