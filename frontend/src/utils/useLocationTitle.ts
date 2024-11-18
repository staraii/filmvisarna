import { useEffect, useRef } from "react";

export default function useLocationTitle(title: string) {
  const defaultTitle = useRef(document.title);
  const titlePrefix = "Filmvisarna - ";

  useEffect(() => {
    const current = defaultTitle.current;
   
    document.title = titlePrefix + title;

    return () => {
      document.title = current;
    }
  }, [title]);
}