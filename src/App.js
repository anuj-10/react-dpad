import React, { useEffect, useState } from "react";
import { fetchAllCategories, fetchCategoryData } from "./api";
import "./App.css";
import Cards from "./components/Cards";
import Navigation from "./components/Navigation";
import { useNavigation } from "./hooks/useNavigation";

function App() {
  const [category, setCategory] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [currentNavIndex, setCurrentNavIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);

  const [current, setNavigation] = useNavigation({
    onSuccess: (data) => setCardData(data),
    onUpKey: () => setCurrentCardIndex((i) => (i > -1 ? i - 1 : i)),
    onDownKey: (len) => setCurrentCardIndex((i) => (len > i ? i + 1 : i)),
    onLeftKey: (len) => setCurrentNavIndex((i) => (i === 0 ? len - 1 : i - 1)),
    onRightKey: (len) =>
      setCurrentNavIndex((i) => (i + 1 > len - 1 ? 0 : i + 1)),
  });

  function onUpKeyEvent() {
    setCurrentCardIndex((i) => (i > -1 ? i - 1 : i));
  }
  function onDownKeyEvent() {
    setCurrentCardIndex((i) => (cardData.len > i ? i + 1 : i));
  }
  function onLeftKeyEvent() {
    setCurrentNavIndex((i) => (i === 0 ? category.len - 1 : i - 1));
  }
  function onDownKeyEvent() {
    setCurrentNavIndex((i) => (i + 1 > category.len - 1 ? 0 : i + 1));
  }

  useEffect(() => {
    async function fetchData() {
      const catagories = await fetchAllCategories();
      setCategory(catagories);
      const firstCategoryData = await fetchCategoryData(catagories[0].link);
      setCardData(firstCategoryData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (currentCardIndex === -1) {
      current.navigationType = "nav";
      setNavigation(current);
    }
  }, [currentCardIndex]);

  useEffect(() => {
    async function fetchData() {
      const cat = category[currentNavIndex].link;
      const categoryData = await fetchCategoryData(cat);
      setCardData(categoryData);
    }
    current.navigationType === "nav" &&
      category[currentNavIndex] &&
      fetchData();
  }, [currentNavIndex]);

  return (
    <div className="App">
      <div className="search-bar">
        <input type="text" placeholder="Search TV" />
      </div>
      <Navigation category={category} currentNavIndex={currentNavIndex} />
      <Cards categoryData={cardData} currentCardIndex={currentCardIndex} />
    </div>
  );
}

export default App;
