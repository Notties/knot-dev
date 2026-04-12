"use client";

import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { useTheme } from "next-themes";
import maplibregl from "maplibre-gl";
import { Map } from "lucide-react";

interface MapComponentProps {
  mapKey: string;
}

export default function MapComponent({ mapKey }: MapComponentProps) {
  const { resolvedTheme } = useTheme();
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const mapStyle =
    resolvedTheme === "dark"
      ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

  useEffect(() => {
    if (!mapContainer.current) return;

    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: [100.5018, 13.7563],
        zoom: 5,
        attributionControl: false,
      });

      map.current.on("load", () => {
        setIsLoading(false);
        map.current?.flyTo({
          center: [100.5018, 13.7563],
          zoom: 13,
          essential: true,
        });
        
        const geojson = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                message: "",
                iconSize: [60, 60],
              },
              geometry: {
                type: "Point",
                coordinates: [100.5018, 13.7563],
              },
            },
          ],
        };

        geojson.features.forEach((marker) => {
          const el = document.createElement("div");
          el.classList.add(
            "relative",
            "flex",
            "size-3",
            "justify-center",
            "items-center"
          );

          const pingSpan = document.createElement("span");
          pingSpan.classList.add(
            "absolute",
            "inline-flex",
            "h-full",
            "w-full",
            "animate-ping",
            "rounded-full",
            "bg-sky-400",
            "opacity-75"
          );
          pingSpan.style.animationDuration = "4s";

          const dotSpan = document.createElement("span");
          dotSpan.classList.add(
            "relative",
            "inline-flex",
            "size-2",
            "rounded-full",
            "bg-sky-500"
          );

          el.appendChild(pingSpan);
          el.appendChild(dotSpan);

          new maplibregl.Marker({ element: el })
            .setLngLat(marker.geometry.coordinates as [number, number])
            .addTo(map.current!);
        });
      });
    } else {
       map.current.setStyle(mapStyle);
       map.current.once("styledata", () => {
         setIsLoading(false);
       });
    }
  }, [mapKey, mapStyle, resolvedTheme]);

  return (
    <div className="relative w-full h-52 rounded-t-[0.7rem] border-x border-t overflow-hidden bg-card">
      {/* Skeleton Loading State */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-muted/30 animate-pulse">
          <Map className="size-8 text-muted-foreground/30 mb-2" />
        </div>
      )}
      
      {/* Map Container */}
      <div
        ref={mapContainer}
        className={`w-full h-full transition-opacity duration-700 ease-in-out ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
