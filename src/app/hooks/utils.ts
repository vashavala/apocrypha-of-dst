import { useEffect, useState } from "react";
import { en, cn } from "@/app/lokalise";
import { getStorage, setStorage } from "./storage";

export const useScreenType = () => {
  const [screenType, setScreenType] = useState<string>("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenType("mobile");
      } else if (window.innerWidth < 1024) {
        setScreenType("tablet");
      } else {
        setScreenType("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile: screenType === "mobile", isTablet: screenType !== "mobile" };
}

interface LangJson {
  [key: string]: { [key: string]: string }
}

export const useTranslation = () => {
  const jsonSet: LangJson = { en, cn }
  const storedLang = getStorage('i18');
  let lang
  if (Object.keys(jsonSet).includes(storedLang)) {
    lang = storedLang
  } else {
    lang = 'en'
    setStorage('i18', 'en')
  }
  const jsonObj = jsonSet[lang as keyof typeof jsonSet]
  return (key: string) => jsonObj[key] || key;
}