import {useState, useEffect} from 'react';


export function useWindowDimensions() {
  const [width, setWidth] = useState(window.innerWidth);
//   const [height, setHeight] = React.useState(window.innerHeight);

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    // setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });

  return {
    width
  }
}