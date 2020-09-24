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
          onRightKey();
        }
        break;
      case "ArrowLeft":
        if (current.navigationType === "nav") {
          onLeftKey();
        }
        break;
      case "ArrowDown":
        current.navigationType = "card";
        setCurrent(current);
        onDownKey(
          current.catagoryData
            ? current.catagoryData.length
            : Number.MAX_SAFE_INTEGER
        );
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
