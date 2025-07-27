import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import georaster from 'georaster';
import 'leaflet/dist/leaflet.css';

function GeoTiffLoader({ tiffUrl }) {
  const map = useMap();

  useEffect(() => {
    const loadGeoTIFF = async () => {
      try {
        const response = await fetch(tiffUrl);
        const arrayBuffer = await response.arrayBuffer();
        const raster = await georaster(arrayBuffer);

        const layer = new GeoRasterLayer({
          georaster: raster,
          opacity: 0.7,
        });

        layer.addTo(map);
        map.fitBounds(layer.getBounds());
      } catch (error) {
        console.error('Failed to load GeoTIFF:', error);
      }
    };

    loadGeoTIFF();
  }, [tiffUrl, map]);

  return null;
}

export default function MyMap() {
  //const tiffUrl = 'https://download.osgeo.org/geotiff/samples/usgs/o41078a5.tif';
  const tiffUrl = '/CarissaMacrocarpa_2100_ssp370_Ensemble.tif';
  return (
    <MapContainer
      style={{ height: '100vh', width: '100%' }}
      center={[0, 0]}
      zoom={2}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoTiffLoader tiffUrl={tiffUrl} />
    </MapContainer>
  );
}
