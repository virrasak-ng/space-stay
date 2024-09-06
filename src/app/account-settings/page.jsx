"use client";
import { Box, Typography, Stack } from "@mui/material";
import Header from "../../../component/Header";
import { usePathname } from "next/navigation";
import AccountCardTabs from "./content_component/AccountCardTabs";
import { useEffect, useState } from "react";
export const Page = () => {
  const location = usePathname();

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/retrieveUser");
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  console.log("user", user);
  return (
    <Box component={"div"}>
      <Box>
        <Header location={location} />
      </Box>
      <Box component={"div"} sx={{ display: "flex", justifyContent: "center" }}>
        <Stack component={"div"}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap:"15px"
            }}
          >
            <Typography
              component={"h1"}
              sx={{ fontWeight: "bold", color: "#9966CC", fontSize: 28 }}
            >
              Account Settings
            </Typography>
            <Typography
              component={"p"}
              sx={{ fontWeight: "bold", color: "#9966CC", fontSize: 20 }}
            >
              {`Logged in as ${user.firstName}, ${user.email}`}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: "35px",
            }}
          >
            <AccountCardTabs
              id={"personalInfo"}
              title={"Personal Info"}
              content={"Provide personal details and how we can reach you"}
            />
            <AccountCardTabs
              id={"myBooking"}
              title={"My Bookings"}
              content={"Bookings made by you"}
            />
            <AccountCardTabs
              id={"myAccomodation"}
              title={"My Accomodation"}
              content={"Home listing made by you"}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Page;
