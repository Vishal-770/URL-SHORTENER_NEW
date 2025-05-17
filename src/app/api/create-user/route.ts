import User from "@/database/models/usermodel";
import { dbConnect } from "@/database/connection";
import { NextRequest, NextResponse } from "next/server";

interface reqBody {
  clerkId: string;
  firstName: string;
  lastName: string;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const data: reqBody = await req.json();

    if (data.clerkId && data.firstName && data.lastName) {
      const { clerkId, firstName, lastName } = data;

      const existingUser = await User.findOne({ clerkId });

      if (existingUser) {
        return NextResponse.json(
          {
            message: "User already exists",
            success: true,
          },
          { status: 201 }
        );
      } else {
        await User.create({ clerkId, firstName, lastName });
        return NextResponse.json(
          { message: "User created", success: true },
          { status: 201 }
        );
      }
    } else {
      return NextResponse.json(
        {
          message: "All fields are required",
          success: false,
        },
        { status: 400 }
      );
    }
  } catch (err) {
    console.log("Error Occured:", err);
    return NextResponse.json(
      { message: "Server error", success: false },
      { status: 500 }
    );
  }
}
