import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const AdminLocations = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAuthHeaders = () => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [wRes, waRes, gRes, rRes] = await Promise.all([
          fetch('http://localhost:3000/api/waste', { headers: getAuthHeaders() }),
          fetch('http://localhost:3000/api/water', { headers: getAuthHeaders() }),
          fetch('http://localhost:3000/api/grievance', { headers: getAuthHeaders() }),
          fetch('http://localhost:3000/api/registrations', { headers: getAuthHeaders() }),
        ]);

        const [waste, water, grievance, regs] = await Promise.all([
          wRes.json(),
          waRes.json(),
          gRes.json(),
          rRes.json(),
        ]);

        const combined = [];
        waste.forEach(i => i.location && combined.push({ ...i, type: 'waste' }));
        water.forEach(i => i.location && combined.push({ ...i, type: 'water' }));
        grievance.forEach(i => i.location && combined.push({ ...i, type: 'grievance' }));
        regs.forEach(i => i.location && combined.push({ ...i, type: 'registration' }));

        setItems(combined);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const center = items.length
    ? [items[0].location.lat, items[0].location.lng]
    : [20.5937, 78.9629];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Submitted Locations
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Paper sx={{ p: 2 }}>
          {items.length ? (
            <MapContainer center={center} zoom={12} style={{ height: 500 }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {items.map(it => (
                <Marker
                  key={it._id}
                  position={[it.location.lat, it.location.lng]}
                >
                  <Popup>
                    <strong>{it.type.toUpperCase()}</strong><br />
                    {it.name ||
                      (it.firstName && `${it.firstName} ${it.lastName}`) ||
                      'No name'}
                    <br />
                    {it.address || it.email || ''}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <Typography color="text.secondary">
              No locations submitted yet.
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default AdminLocations;
