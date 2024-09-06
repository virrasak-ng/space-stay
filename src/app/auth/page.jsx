"use client";
import * as React from "react";
import Header from "../../../component/Header";
import { usePathname } from "next/navigation";
import { Stack, Box, Typography, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const router = useRouter();

  const handleNavigateRegister = () => {
    router.push("/register");
  };

  const loginUser = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!data) {
        console.log("Incorrect email or password");
        return false;
      } else {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setReady(true);
        router.push("/");
        return true;
      }
    } catch (error) {
      console.error("error loggin in", error);
    }
  };

  const location = usePathname();

  return (
    <Stack component={"div"}>
      <Header location={location} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          component={"form"}
          onSubmit={loginUser}
          variant="outlined"
          sx={{
            marginTop: "100px",
            width: 750,
            height: 500,
            borderRadius: "20px",
          }}
        >
          <CardContent>
            <Box
              component={"div"}
              sx={{
                borderBottom: 1,
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <Typography
                gutterBottom
                sx={{ color: "#9966CC", fontSize: 20, alignItems: "center" }}
              >
                Login or Signup?
              </Typography>
            </Box>
            <Box padding={"40px"}>
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <TextField
                  sx={{ width: "100%" }}
                  label="Email"
                  variant="outlined"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <TextField
                  sx={{ width: "100%" }}
                  label="Password"
                  variant="outlined"
                  placeholder="Enter password"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </Box>
            </Box>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="submit"
                sx={{
                  border: 1,
                  width: "50%",
                  color: "white",
                  backgroundColor: "#9966CC",
                }}
              >
                Login
              </Button>
              <Button
                onClick={handleNavigateRegister}
                sx={{
                  border: 1,
                  width: "50%",
                  color: "white",
                  backgroundColor: "#9966CC",
                }}
              >
                Register
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </Stack>
  );
};

export default Page;
