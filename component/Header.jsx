"use client";

import React, { useState } from "react";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import DateRangeFilter from "../component/DateRangeFilter";
import FaceIcon from "@mui/icons-material/Face";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";

export const Header = ({ location, user, logOutUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  const handleNavigateLogin = () => {
    router.push("/auth");
  };

  const handleNavigateRegister = () => {
    router.push("/register");
  };

  const handleNavigateHome = () => {
    router.push("/");
  };

  return (
    <Stack
      component={"div"}
      sx={{
        marginTop: "20px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
          padding: "20px",
          width: "90%",
          justifyContent: "space-between",
        }}
      >
        <Box
          component={"div"}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <IconButton onClick={handleNavigateHome}>
            <HolidayVillageIcon sx={{ fontSize: "50px", color: "#9966CC" }} />
          </IconButton>
          <Typography sx={{ fontWeight: "bold", color: "#9966CC" }}>
            StaySpace
          </Typography>
        </Box>
        {location === "/auth" || location === "/register" ? null : (
          <Box
            component={"div"}
            sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <DateRangeFilter startLabel="Check-in" endLabel="Check-out" />
          </Box>
        )}

        {location === "/auth" || location === "/register" ? null : (
          <Box component={"div"}>
            <IconButton
              id="basic-icon-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ gap: "10px" }}
            >
              {user ? null : (
                <MenuIcon sx={{ fontSize: "25px", color: "#9966CC" }} />
              )}
              <FaceIcon sx={{ fontSize: "40px", color: "#9966CC" }} />
              {user ? (
                <Typography sx={{ color: "#9966CC", fontWeight: "bold" }}>
                  {user.firstName}
                </Typography>
              ) : null}
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "basic-icon-button" }}
            >
              {user ? (
                <>
                  <MenuItem onClick={handleNavigateLogin}>Settings</MenuItem>
                  <MenuItem onClick={logOutUser}>Log-Out</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleNavigateLogin}>Log-In</MenuItem>
                  <MenuItem onClick={handleNavigateRegister}>Sign-up</MenuItem>
                </>
              )}
            </Menu>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default Header;
