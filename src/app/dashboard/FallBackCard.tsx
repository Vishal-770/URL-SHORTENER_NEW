import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link2 } from "lucide-react";

const FallBackCard = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 text-center">
          <div className="space-y-3">
            <Link2 className="mx-auto h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-medium">No shortened URLs yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Create your first short link by entering a URL above.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default FallBackCard;
