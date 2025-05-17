import { dbConnect } from "@/database/connection";


export async function GET() {
  await dbConnect();

  return Response.json({ message: "DB connected!" });
}
