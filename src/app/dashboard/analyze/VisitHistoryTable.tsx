import React from "react";
interface VisitEntry {
  timestamp: Date;
  ip: string;
  deviceType: string;
  os: string;
  browser: string;
  referrer: string;
  userAgent: string;
}
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const VisitHistoryTable = ({ data }: { data: VisitEntry[] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="mt-6 rounded-lg border border-muted p-4 text-center text-muted-foreground">
        No visit history available.
      </div>
    );
  }
  return (
    <div className="p-4 mt-6 overflow-x-auto rounded-lg border">
      <Table>
        <TableCaption className="text-muted-foreground">
          A detailed log of each visit
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[120px]">IP</TableHead>
            <TableHead className="min-w-[100px]">Device</TableHead>
            <TableHead className="min-w-[100px]">OS</TableHead>
            <TableHead className="min-w-[100px]">Browser</TableHead>
            <TableHead className="min-w-[150px]">Referrer</TableHead>
            <TableHead className="min-w-[250px]">User Agent</TableHead>
            <TableHead className="min-w-[160px]">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((entry, index) => (
            <TableRow key={index} className="hover:bg-accent">
              <TableCell>{entry.ip}</TableCell>
              <TableCell>{entry.deviceType}</TableCell>
              <TableCell>{entry.os}</TableCell>
              <TableCell>{entry.browser}</TableCell>
              <TableCell className="truncate max-w-[150px]">
                {entry.referrer || "—"}
              </TableCell>
              <TableCell className="truncate max-w-[250px]">
                {entry.userAgent}
              </TableCell>
              <TableCell>
                {new Date(entry.timestamp).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VisitHistoryTable;
