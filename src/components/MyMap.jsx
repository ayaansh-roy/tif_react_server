import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import GeoRasterLayer from "georaster-layer-for-leaflet";
import parseGeoraster from "georaster";

function GeoTIFFOverlay({ url }) {
  const map = useMap();

  useEffect(() => {
    fetch(url)
      .then(res => res.arrayBuffer())
      .then(parseGeoraster)
      .then(georaster => {
        const layer = new GeoRasterLayer({
          georaster,
          opacity: 0.7
        });
        layer.addTo(map);
        map.fitBounds(layer.getBounds());
        // Optional: clean up the layer when the component unmounts
        return () => {
          map.removeLayer(layer);
        };
      });
  }, [url, map]);

  return null;
}

const ExampleMap = () => (
  <MapContainer style={{ height: "600px" }} center={[0, 0]} zoom={2}>
    <TileLayer
      attribution="© OpenStreetMap contributors"
      url="http://54.227.19.8:8000/tiles/{z}/{x}/{y}.png"
    />
    <GeoTIFFOverlay url="CarissaMacrocarpa_2100_ssp370_Ensemble.tif" />
  </MapContainer>
);
export default ExampleMap;
