import { useEffect, useState } from "react";

export const useNavigation = ({
  onUpKey,
  onDownKey,
  onLeftKey,
  onRightKey,
}) => {
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    setNavigation(0);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const [current, setCurrent] = useState({
    navigationType: "nav",
    allCategoriesLength: 0,
    cardLength: 0,
  });

  const setNavigation = () => current;

  const onKeyDown = async ({ key }) => {
    if (
      key !== "ArrowRight" &&
      key !== "ArrowLeft" &&
      key !== "ArrowDown" &&
      key !== "ArrowUp"
    )
      return;

    switch (key) {
      case "ArrowRight":
        if (current.navigationType === "nav") {
          onRightKey(current.allCategoriesLength);
        }
        break;
      case "ArrowLeft":
        if (current.navigationType === "nav") {
          onLeftKey(current.allCategoriesLength);
        }
        break;
      case "ArrowDown":
        current.navigationType = "card";
        setCurrent(current);
        onDownKey(current.cardLength);
        break;
      case "ArrowUp":
        onUpKey();
        break;
      default:
        break;
    }
  };

  return [current, setNavigation];
};
