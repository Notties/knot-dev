"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useTheme } from "next-themes";

interface MapComponentProps {
  mapKey: string;
}

export default function MapComponent({ mapKey }: MapComponentProps) {
  const { resolvedTheme } = useTheme();
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);

  const mapStyle = resolvedTheme === "dark" ? "/map/alidade_smooth_dark.json" : "/map/alidade_smooth.json";

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
    }

    map.current.setStyle(mapStyle);

  }, [mapKey, mapStyle, resolvedTheme]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[13rem] rounded-t-[0.7rem] border-x border-t"
    />
  );
}
