import { NextResponse } from "next/server";
import dbConnect from "../../../_utils/mongodb";
import userModel from "../../../model/Users";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

dotenv.config();
const jwtSecret = process.env.jwt_secret;

export async function POST(request) {
  await dbConnect();

  const { email, password } = await request.json();
  console.log("email from route", email);

  try {
    const findUser = await userModel.findOne({ email });
    console.log("user found", findUser);

    if (!findUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);

    if (passwordMatch) {
      const token = await new Promise((resolve, reject) => {
        jwt.sign(
          {
            email: findUser.email,
            id: findUser._id,
            name: findUser.name,
          },
          jwtSecret,
          {},
          (err, token) => {
            if (err) {
              console.log("error creating token", err);
              reject(err);
            } else {
              resolve(token);
            }
          }
        );
      });

      // Set the cookie
      cookies().set({
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
      });

      return NextResponse.json({ message: "Logged in successfully" });
    } else {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
