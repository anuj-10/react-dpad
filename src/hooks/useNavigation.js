import { useEffect, useState } from "react";

export const useNavigation = ({
  onUpKey,
  onDownKey,
  onLeftKey,
  onRightKey,
  onEnterKey,
  onBackspaceKey,
}) => {
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    setNavigation(0);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const [current, setCurrent] = useState({
    navigationType: "nav",
    allCategoriesLength: 0, // For down navigation
    cardLength: 0, // For right and left navigation
  });

  const setNavigation = () => current;

  const onKeyDown = async ({ key }) => {
    console.log(key);
    if (
      key !== "ArrowRight" &&
      key !== "ArrowLeft" &&
      key !== "ArrowDown" &&
      key !== "ArrowUp" &&
      key !== "Enter" &&
      key !== "Backspace"
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
      case "Enter":
        onEnterKey();
        break;
      case "Backspace":
        onBackspaceKey();
        break;

      default:
        break;
    }
  };

  return [current, setNavigation];
};
