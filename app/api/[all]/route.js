import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Student from "@/lib/model/student.js";

export async function ConnectToDatabase() {
  try {
    const conn = mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Database!");
  } catch (err) {
    console.error("Database connection error:", err);
    throw new Error("Failed to connect to the database");
  }
}

export async function GET(request, { params }) {
  const { all: id } = params;
  if (!id) {
    return NextResponse.json({ message: "all is missing" }, { status: 400 });
  }
  try {
    await ConnectToDatabase();
    const students = await Student.find();
    if (!students || students.length === 0) {
      return NextResponse.json({ message: "No Record Found" }, { status: 200 });
    }
    return NextResponse.json(students, {
      status: 200,
    });
  } catch (err) {
    console.error("Error fetching student data:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
