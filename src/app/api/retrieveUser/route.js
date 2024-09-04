import userModel from "../../model/Users";
import { NextResponse } from "next/server";
import dbConnect from "../../_utils/mongodb";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.jwt_secret;

export async function GET(request) {
  await dbConnect();

  const cookies = request.cookies;

  const token = cookies.get("token");

  if (token) {
    try {
      const decoded = jwt.verify(token.value, jwtSecret);
      const { fName, lName, email } = await userModel.findOne({
        email: decoded.email,
      });

      const user = {
        firstName: fName,
        lastName: lName,
        email: email,
      };

      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  } else {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
