"use client";
import { AddNewUrl } from "@/services/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";

const URLInput = () => {
  const { isLoaded, user } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<{ originalUrl: string }>();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: { originalUrl: string; clerkId: string }) =>
      AddNewUrl(data.originalUrl, data.clerkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Allurls"] });
      reset();
      toast.success("URL shortened successfully", {
        className: "bg-success text-success-foreground border-border",
        description: "Your link is ready to share!",
      });
    },
    onError: () => {
      toast.error("Failed to shorten URL", {
        className: "bg-destructive text-destructive-foreground border-border",
        description: "Please check the URL and try again",
      });
    },
  });

  const onSubmit = (data: { originalUrl: string }) => {
    if (!isLoaded || !user) return;
    createMutation.mutate({ originalUrl: data.originalUrl, clerkId: user.id });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full"
    >
      <Card className="p-4 sm:p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 sm:space-y-4"
        >
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Input
                type="text"
                placeholder="https://your-long-url.com/with/many/parameters"
                disabled={!isLoaded || createMutation.status === "pending"}
                className="flex-1 min-w-0 h-12 sm:h-10" // Adjusted heights
                {...register("originalUrl", {
                  required: "URL is required",
                  pattern: {
                    value:
                      /^(https?:\/\/)(localhost|(\d{1,3}\.){3}\d{1,3}|([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(:\d+)?(\/.*)?$/i,
                    message: "Must start with http:// or https://",
                  },
                })}
              />
              <Button
                type="submit"
                disabled={
                  !isLoaded || createMutation.status === "pending" || !isValid
                }
                className="w-full sm:w-auto flex-shrink-0 h-12 sm:h-10" // Match button height
              >
                {createMutation.status === "pending" ? (
                  <>
                    <Loader2 className="mr-1 sm:mr-2 h-4 w-4 animate-spin" />
                    <span className="truncate">Shortening...</span>
                  </>
                ) : (
                  <>
                    <Plus className="mr-1 sm:mr-2 h-4 w-4" />
                    <span className="truncate">Shorten URL</span>
                  </>
                )}
              </Button>
            </div>
            {errors.originalUrl && (
              <p className="text-sm text-destructive px-1 sm:px-0">
                {errors.originalUrl.message}
              </p>
            )}
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default URLInput;
