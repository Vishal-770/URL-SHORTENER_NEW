"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Map, MapControls, MapMarker, MarkerContent } from "@/components/ui/map";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  latitude: string | number;
  longitude: string | number;
  city?: string;
  country?: string;
}

export function MapModal({
  isOpen,
  onClose,
  latitude,
  longitude,
  city,
  country,
}: MapModalProps) {
  const lat = typeof latitude === "string" ? parseFloat(latitude) : latitude;
  const lon = typeof longitude === "string" ? parseFloat(longitude) : longitude;

  // Validate coordinates
  const isValid = !isNaN(lat) && !isNaN(lon) && lat !== 0 && lon !== 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-border/20 bg-background/95 backdrop-blur-xl">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <MapPin className="h-4 w-4 text-secondary" />
            Precise Location
          </DialogTitle>
          <DialogDescription className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
            {city ? `${city}, ` : ""}{country || "Unknown Location"} • Coordinates: {lat.toFixed(4)}, {lon.toFixed(4)}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          <Card className="h-[400px] relative w-full overflow-hidden border-border/10 bg-muted/5 group">
            {!isValid ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted/10">
                <Navigation className="h-8 w-8 text-muted-foreground/20 animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                  Coordinates Unavailable
                </p>
              </div>
            ) : (
              <Map center={[lon, lat]} zoom={12} className="w-full h-full">
                <MapControls />
                <MapMarker longitude={lon} latitude={lat}>
                  <MarkerContent />
                </MapMarker>
              </Map>
            )}
            
            {/* Visual Polish: Corner labels */}
            <div className="absolute bottom-4 left-4 z-10">
               <div className="bg-background/80 backdrop-blur-md border border-border/20 px-3 py-1.5 rounded-full shadow-2xl">
                  <p className="text-[9px] font-black uppercase tracking-widest text-foreground/80 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                    Live Interaction Zone
                  </p>
               </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
