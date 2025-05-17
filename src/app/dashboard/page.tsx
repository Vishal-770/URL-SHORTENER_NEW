"use client";

import { Button } from "@/components/ui/button";

import { CreateUserInDB, DeleteUrl, GetAllUrl } from "@/services/service";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Loader2,
  Trash2,
  Link2,
  ExternalLink,
  Copy,
  Check,
  BarChart2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import URLInput from "./URLInput";
import DashboardHeader from "./DashboardHeader";

export default function Page() {
  const { isLoaded, user } = useUser();
  const [hasSynced, setHasSynced] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const queryClient = useQueryClient();

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

  // Mutation for deleting a URL
  const deleteMutation = useMutation({
    mutationFn: (slug: string) => DeleteUrl(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Allurls"] });
      toast("URL deleted", {
        className: "bg-secondary text-secondary-foreground border-border",
        description: "The shortened link has been removed",
      });
    },
    onError: () => {
      toast.error("Failed to delete URL", {
        className: "bg-destructive text-destructive-foreground border-border",
        description: "Please try again later",
      });
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Allurls"],
    queryFn: () => GetAllUrl(user?.id || ""),
    enabled: isLoaded && !!user,
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSlug(text);
    setTimeout(() => setCopiedSlug(null), 2000);
    toast.success("Copied to clipboard", {
      className: "bg-success text-success-foreground border-border",
    });
  };

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
                  {data.map(
                    (url: {
                      _id: string;
                      originalUrl: string;
                      slug: string;
                      visitHistory?: { date: string }[];
                      createdAt: string;
                    }) => (
                      <motion.div
                        key={url._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        layout
                      >
                        <Card className="p-5 group hover:border-primary/50 transition-all duration-300">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-2.5 flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <Link2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <a
                                  href={url.originalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm font-medium hover:underline truncate"
                                  title={url.originalUrl}
                                >
                                  {url.originalUrl}
                                </a>
                              </div>
                              <div className="flex items-center gap-2">
                                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <a
                                  href={`/redirect/${url.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm font-medium hover:underline text-primary truncate"
                                >
                                  {`${process.env.NEXT_PUBLIC_BASE_URL}/redirect/${url.slug}`}
                                </a>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      `${process.env.NEXT_PUBLIC_BASE_URL}/redirect/${url.slug}`
                                    )
                                  }
                                  className="ml-2 p-1 rounded hover:bg-accent transition-colors"
                                  aria-label="Copy to clipboard"
                                >
                                  {copiedSlug ===
                                  `${process.env.NEXT_PUBLIC_BASE_URL}/redirect/${url.slug}` ? (
                                    <Check className="h-3 w-3 text-green-600" />
                                  ) : (
                                    <Copy className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                  )}
                                </button>
                              </div>
                              <div className="flex items-center gap-4 pt-1">
                                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                  <BarChart2 className="h-3 w-3" />
                                  {url.visitHistory?.length || 0} clicks
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Created:{" "}
                                  {new Date(url.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={
                                      deleteMutation.status === "pending"
                                    }
                                    className="text-destructive hover:text-destructive"
                                  >
                                    {deleteMutation.status === "pending" ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="h-4 w-4" />
                                    )}
                                    <span className="ml-2 hidden sm:inline">
                                      Delete
                                    </span>
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete this URL?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete the shortened
                                      URL and all its analytics data.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        deleteMutation.mutate(url.slug)
                                      }
                                      disabled={
                                        deleteMutation.status === "pending"
                                      }
                                      className="bg-destructive hover:bg-destructive/90"
                                    >
                                      {deleteMutation.status === "pending" ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      ) : null}
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    )
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8 text-center">
                  <div className="space-y-3">
                    <Link2 className="mx-auto h-10 w-10 text-muted-foreground" />
                    <h3 className="text-lg font-medium">
                      No shortened URLs yet
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Create your first short link by entering a URL above.
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.section>
        </div>
      </main>

      <footer className="mt-20 py-6 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} URL Shortener. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
