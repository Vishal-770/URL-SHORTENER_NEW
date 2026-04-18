import dotenv from "dotenv";
import path from "path";

// Load environment variables IMMEDIATELY
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function dropIndex() {
  try {
    // Dynamic import to ensure env variables are loaded first
    const { dbConnect } = await import("../connection");
    const { default: mongoose } = await import("mongoose");

    console.log("Connecting to database...");
    await dbConnect();
    
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Failed to get database instance");
    }

    const collectionName = "users";
    const indexName = "clerkId_1";

    console.log(`Attempting to drop index '${indexName}' from collection '${collectionName}'...`);
    
    const result = await db.collection(collectionName).dropIndex(indexName);
    
    console.log("Success:", result);
  } catch (error) {
    if (error instanceof Error && error.message.includes("index not found")) {
      console.log("Notice: The index 'clerkId_1' was already removed or does not exist.");
    } else {
      console.error("Error dropping index:", error);
    }
  } finally {
    process.exit(0);
  }
}

dropIndex();
