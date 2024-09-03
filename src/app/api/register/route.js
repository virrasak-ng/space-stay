import userModel from "../../model/Users";
import { NextResponse } from "next/server";
import dbConnect from "../../_utils/mongodb"; 

export async function POST(request) {
  await dbConnect();

  const { fName, lName, email, password } = await request.json();

  try {
    const exisitingUser = await userModel.findOne({ email });
    console.log('exisitingUser', exisitingUser)
    if (exisitingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = new userModel({ fName, lName, email, password });
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
