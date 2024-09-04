"use client";
import Header from "../../component/Header";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const Page = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/retrieveUser");
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  const location = usePathname();
  return <Header location={location} user={user} />;
};

export default Page;
