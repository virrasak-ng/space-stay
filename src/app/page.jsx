"use client";
import Header from "../../component/Header";
import { usePathname } from "next/navigation";


export const Page = () => {
  const location = usePathname()
  return (
    <Header location={location}/>
  )
}

export default Page;
