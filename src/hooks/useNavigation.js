import { useEffect, useState } from "react";
import { fetchCategoryData } from "../api";

export const useNavigation = ({ onSuccess, onUpKey, onDownKey }) => {
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    setNavigation(0);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const [current, setCurrent] = useState({
    type: null,
    index: null,
    catagoryData: [],
    navigationType: "nav",
  });

  const getAllElements = () => document.querySelectorAll("[nav-selectable]");

  const getTheIndexOfTheSelectedElement = () => {
    const element = document.querySelector("[nav-selected=true]");
    return element ? parseInt(element.getAttribute("nav-index")) : 0;
  };

  const setNavigation = (index) =>
    selectElement(getAllElements()[index] || document.body);

  const onKeyDown = async (evt) => {
    if (
      evt.key !== "ArrowRight" &&
      evt.key !== "ArrowLeft" &&
      evt.key !== "ArrowDown" &&
      evt.key !== "ArrowUp"
    )
      return;

    const allElements = getAllElements();
    const currentIndex = getTheIndexOfTheSelectedElement();

    let setIndex;

    switch (evt.key) {
      case "ArrowRight":
        const goToFirstElement = currentIndex + 1 > allElements.length - 1;
        setIndex = goToFirstElement ? 0 : currentIndex + 1;
        break;
      case "ArrowLeft":
        const goToLastElement = currentIndex === 0;
        setIndex = goToLastElement ? allElements.length - 1 : currentIndex - 1;
        break;
      case "ArrowDown":
        current.navigationType = "card";
        setCurrent(current);
        onDownKey();
        break;
      case "ArrowUp":
        current.navigationType = "nav";
        setCurrent(current);
        onUpKey();
        break;
      default:
        break;
    }
    console.log("current => ", current, evt.key);
    if (
      current.navigationType === "nav" &&
      (evt.key === "ArrowLeft" || evt.key === "ArrowRight")
    ) {
      const data = allElements[setIndex].getAttribute("data-link");
      console.log("Route data => ", data);
      const catagoryData = await fetchCategoryData(data);
      selectElement(
        allElements[setIndex] || allElements[0],
        setIndex,
        catagoryData
      );
      onSuccess(catagoryData);
    }
  };

  const selectElement = (selectElement, setIndex = 0, catagoryData = []) => {
    if (selectElement) {
      [].forEach.call(getAllElements(), (element, index) => {
        const selectThisElement = element;
        element.setAttribute("nav-selected", element === selectElement);
        element.setAttribute("nav-index", index);
        if (selectThisElement) {
          selectThisElement.scrollIntoView(true);
          // if (element.nodeName === "INPUT") {
          // element.focus();
          // } else {
          //   element.blur();
          // }
        }
      });
      selectElement.focus();
      setCurrent({
        type: selectElement.tagName,
        index: setIndex,
        catagoryData,
        navigationType: "nav",
      });
    } else {
      setNavigation(0);
    }
  };

  return [current, setNavigation];
};
