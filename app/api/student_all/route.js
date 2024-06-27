import { NextResponse } from "next/server";
import { ConnectToDatabase } from "../student/[applicationNumber]/route.js";
import Student from "@/lib/model/student";

export async function GET() {
  try {
    await ConnectToDatabase();
    const students = await Student.find();
    // console.log("Getting all data!");
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