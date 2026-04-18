import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link2, Sparkles } from "lucide-react";

const FallBackCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="rounded-3xl border border-dashed p-10 text-center">
        <div className="mx-auto flex max-w-md flex-col items-center space-y-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
            <Link2 className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">No shortened URLs yet</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              Start by creating your first link. It will appear here with quick
              actions, QR access, and analytics.
            </p>
          </div>
          <Button variant="secondary" className="rounded-xl">
            <Sparkles className="mr-2 h-4 w-4" />
            Ready for your first link
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default FallBackCard;
