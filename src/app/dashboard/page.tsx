"use client";

import { CreateUserInDB, GetAllUrl } from "@/services/service";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Link2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import URLInput from "./URLInput";
import DashboardHeader from "./DashboardHeader";
import FallBackCard from "./FallBackCard";

import URLCard from "./URLCard";
interface URL {
  _id: string;
  originalUrl: string;
  slug: string;
  visitHistory?: { date: string }[];
  createdAt: string;
}

export default function Page() {
  const { isLoaded, user } = useUser();
  const [hasSynced, setHasSynced] = useState(false);

  // Sync user to DB on first load
  useEffect(() => {
    if (isLoaded && user && !hasSynced) {
      const syncUser = async () => {
        try {
          const clerkId = user.id;
          const firstName = user.firstName || "";
          const lastName = user.lastName || "";
          await CreateUserInDB(clerkId, firstName, lastName);
          setHasSynced(true);
          toast.success("Account synced successfully", {
            className: "bg-success text-success-foreground border-border",
          });
        } catch (err) {
          console.error("Failed to sync user:", err);
          toast.error("Failed to sync user account", {
            className:
              "bg-destructive text-destructive-foreground border-border",
          });
        }
      };
      syncUser();
    }
  }, [isLoaded, user, hasSynced]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Allurls"],
    queryFn: () => GetAllUrl(user?.id || ""),
    enabled: isLoaded && !!user,
  });

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <DashboardHeader />

          <URLInput />

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Link2 className="h-5 w-5 text-primary" />
                Your Shortened Links
              </h2>
              {data?.length > 0 && (
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                  {data.length} {data.length === 1 ? "link" : "links"}
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
              </div>
            ) : isError ? (
              <Card className="p-6 text-center">
                <p className="text-destructive">
                  Failed to load URLs. Please refresh the page.
                </p>
              </Card>
            ) : data?.length > 0 ? (
              <div className="space-y-4">
                <AnimatePresence>
                  {data.map((url: URL) => (
                    <motion.div
                      key={url._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      <URLCard url={url} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <FallBackCard />
            )}
          </motion.section>
        </div>
      </main>
    </div>
  );
}
