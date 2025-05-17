import React from "react";
import { motion } from "framer-motion";

const DashboardHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-3 text-center"
    >
      <h1 className="text-4xl font-bold tracking-tight">URL Shortener</h1>
      <p className="text-muted-foreground">
        Create clean, shareable links with analytics
      </p>
    </motion.header>
  );
};

export default DashboardHeader;
