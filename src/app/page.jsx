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

  const logOutUser = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const location = usePathname();
  return <Header location={location} user={user} logOutUser={logOutUser} />;
};

export default Page;
