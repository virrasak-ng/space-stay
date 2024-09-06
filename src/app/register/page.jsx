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
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleNavigateAuth = () => {
    router.push("/auth");
  };

  const registerUser = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          fName,
          lName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User created successfully:", data);
        router.push("/auth");
      } else {
        console.error("Error creating user:", data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
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
          onSubmit={registerUser}
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
                  marginTop: "10px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <TextField
                  sx={{ width: "40%" }}
                  label="Email"
                  variant="outlined"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  sx={{ width: "40%" }}
                  label="Password"
                  variant="outlined"
                  placeholder="Enter password"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>

              <Box
                component={"div"}
                sx={{
                  marginTop: "30px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <TextField
                  sx={{ width: "40%" }}
                  label="First Name"
                  variant="outlined"
                  placeholder="Enter first name"
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                />
                <TextField
                  sx={{ width: "40%" }}
                  label="Last Name"
                  variant="outlined"
                  placeholder="Enter last name"
                  value={lName}
                  onChange={(e) => setLName(e.target.value)}
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
                Register
              </Button>
              <Button
                onClick={handleNavigateAuth}
                sx={{
                  border: 1,
                  width: "50%",
                  color: "white",
                  backgroundColor: "#9966CC",
                }}
              >
                Back
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </Stack>
  );
};

export default Page;
