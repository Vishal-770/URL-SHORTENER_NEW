"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AddNewUrl,
  CreateUserInDB,
  DeleteUrl,
  GetAllUrl,
} from "@/services/service";
import { useUser } from "@clerk/nextjs";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { Loader2, Trash2, Link2, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function Page() {
  const { isLoaded, user } = useUser();
  const [hasSynced, setHasSynced] = useState(false);
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
        } catch (err) {
          console.error("Failed to sync user:", err);
          toast.error("Failed to sync user account");
        }
      };
      syncUser();
    }
  }, [isLoaded, user, hasSynced]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<{ originalUrl: string }>();

  // Mutation for adding a URL
  const createMutation = useMutation({
    mutationFn: (data: { originalUrl: string; clerkId: string }) =>
      AddNewUrl(data.originalUrl, data.clerkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Allurls"] });
      reset();
      toast.success("URL shortened successfully");
    },
    onError: () => {
      toast.error("Failed to shorten URL");
    },
  });

  // Mutation for deleting a URL
  const deleteMutation = useMutation({
    mutationFn: (slug: string) => DeleteUrl(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Allurls"] });
      toast("URL deleted");
    },
    onError: () => {
      toast.error("Failed to delete URL");
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Allurls"],
    queryFn: () => GetAllUrl(user?.id || ""),
    enabled: isLoaded && !!user,
  });

  const onSubmit = (data: { originalUrl: string }) => {
    if (!isLoaded || !user) return;
    createMutation.mutate({ originalUrl: data.originalUrl, clerkId: user.id });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">URL Shortener</h1>
            <p className="text-muted-foreground">
              Create clean, shareable links for any URL
            </p>
          </header>

          <Card className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="text"
                    placeholder="https://example.com"
                    disabled={!isLoaded || createMutation.isLoading}
                    className="flex-1"
                    {...register("originalUrl", {
                      required: "URL is required",
                      pattern: {
                        value:
                          /^(https?:\/\/)(localhost|(\d{1,3}\.){3}\d{1,3}|([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(:\d+)?(\/.*)?$/i,
                        message:
                          "Must start with http:// or https://",
                      },
                    })}
                  />
                  <Button
                    type="submit"
                    disabled={!isLoaded || createMutation.isLoading || !isValid}
                    className="w-full sm:w-auto"
                  >
                    {createMutation.isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Shortening...
                      </>
                    ) : (
                      "Shorten"
                    )}
                  </Button>
                </div>
                {errors.originalUrl && (
                  <p className="text-sm text-destructive">
                    {errors.originalUrl.message}
                  </p>
                )}
              </div>
            </form>
          </Card>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Your Links</h2>
            
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
              </div>
            ) : isError ? (
              <Card className="p-6 text-center">
                <p className="text-destructive">
                  Failed to load URLs
                </p>
              </Card>
            ) : data?.length > 0 ? (
              <div className="space-y-3">
                {data.map((url: any) => (
                  <Card key={url._id} className="p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Link2 className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={url.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium hover:underline truncate"
                          >
                            {url.originalUrl}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={`/redirect/${url.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium hover:underline"
                          >
                            {`${process.env.NEXT_PUBLIC_BASE_URL}/redirect/${url.slug}`}
                          </a>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Visits: {url.visitHistory?.length || 0}
                        </p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={deleteMutation.isLoading}
                            className="w-full md:w-auto border-destructive text-destructive hover:text-destructive"
                          >
                            {deleteMutation.isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                            <span className="ml-2">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete this URL?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the shortened URL.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate(url.slug)}
                              disabled={deleteMutation.isLoading}
                            >
                              {deleteMutation.isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : null}
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">
                  No shortened URLs yet
                </p>
              </Card>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}