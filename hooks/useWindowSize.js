import { useEffect, useState } from "react";

const initialSize = { width: null, height: null };

export default function useWindowSize() {
  const [size, setSize] = useState(initialSize);

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
