"use client";
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
import { Button } from "@/components/ui/button";
import { DeleteUrl } from "@/services/service";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
const DeleteButton = ({ slug }: { slug: string }) => {
  const queryClient = useQueryClient();
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
  return (
    <div className="flex gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            disabled={deleteMutation.status === "pending"}
            className="text-destructive hover:text-destructive"
          >
            {deleteMutation.status === "pending" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            <span className="ml-2 hidden sm:inline">Delete</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this URL?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the shortened URL and all its
              analytics data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMutation.mutate(slug)}
              disabled={deleteMutation.status === "pending"}
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
  );
};

export default DeleteButton;
