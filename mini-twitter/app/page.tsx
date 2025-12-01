"use client";

import { useEffect, useState } from "react";
import PublicHomePage from "./(public)/page";
import PrivateHomePage from "./(private)/home/page";

export default function RootRouter() {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
  }, []);

  if (isLogged === null) {
    return <div className="text-center text-gray-300 mt-20">Caricamento...</div>;
  }

  return isLogged ? <PrivateHomePage /> : <PublicHomePage />;
}