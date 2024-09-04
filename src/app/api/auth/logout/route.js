import { NextResponse } from "next/server";
import dbConnect from "@/app/_utils/mongodb";

export async function POST(request) {
  await dbConnect();

  const response = NextResponse.json({ message: "Logged out successfully" });

  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return response;
}
