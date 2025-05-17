"use client";

import { CreateUserInDB } from "@/services/createUser";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
// Adjust this path to your actual file

export default function Page() {
  const { isLoaded, user } = useUser();
  const [hasSynced, setHasSynced] = useState(false); // Prevent duplicate calls

  useEffect(() => {
    if (isLoaded && user && !hasSynced) {
      const syncUser = async () => {
        try {
          const clerkId = user.id;
          const firstName = user.firstName || "";
          const lastName = user.lastName || "";

          await CreateUserInDB(clerkId, firstName, lastName);

          setHasSynced(true);
        } catch (err) {
          console.error("Failed to sync user:", err);
        }
      };

      syncUser();
    }
  }, [isLoaded, user, hasSynced]);

  return <h1>Home Page</h1>;
}
