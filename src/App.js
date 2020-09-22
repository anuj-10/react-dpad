import React, { useEffect, useState } from "react";
import { fetchAllCategories, fetchCategoryData } from "./api";
import "./App.css";
import Cards from "./components/Cards";
import Navigation from "./components/Navigation";
import { useNavigation } from "./hooks/useNavigation";

function App() {
  const [category, setCategory] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const [current, setNavigation] = useNavigation({
    onSuccess: (data) => setCardData(data),
    onUpKey: () => setCurrentIndex((i) => (i > -1 ? i - 1 : i)),
    onDownKey: () => setCurrentIndex((i) => i + 1),
  });

  useEffect(async () => {
    const catagories = await fetchAllCategories();
    // console.log("All categories ", catagories);
    setCategory(catagories);
    const firstCategoryData = await fetchCategoryData(catagories[0].link);
    setCardData(firstCategoryData);
  }, []);

  useEffect(() => {
    if (currentIndex === -1) {
      current.navigationType = "nav";
      setNavigation(current);
    }
  }, [currentIndex]);

  return (
    <div className="App">
      <div className="search-bar">
        <input type="text" placeholder="Search TV" />
      </div>
      <Navigation category={category} />
      <Cards categoryData={cardData} currentIndex={currentIndex} />
    </div>
  );
}

export default App;
