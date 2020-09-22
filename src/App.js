import React, { useEffect, useState } from "react";
import { fetchAllCategories, fetchCategoryData } from "./api";
import "./App.css";
import Cards from "./components/Cards";
import Navigation from "./components/Navigation";
import { useNavigation } from "./hooks/useNavigation";

function App() {
  const [category, setCategory] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [downFocus, setDownFocus] = useState(false);

  const [current, setNavigation] = useNavigation({
    onSuccess: (data) => setCardData(data),
    onUpKey: () => setDownFocus(false),
    onDownKey: () => setDownFocus(true),
  });

  useEffect(async () => {
    const catagories = await fetchAllCategories();
    // console.log("All categories ", catagories);
    setCategory(catagories);
    const firstCategoryData = await fetchCategoryData(catagories[0].link);
    setCardData(firstCategoryData);
  }, []);

  return (
    <div className="App">
      <div className="search-bar">
        <input type="text" placeholder="Search TV" />
      </div>
      <Navigation category={category} />
      <Cards categoryData={cardData} downFocus={downFocus} />
    </div>
  );
}

export default App;
