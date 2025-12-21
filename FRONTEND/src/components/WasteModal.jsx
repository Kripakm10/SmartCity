import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, CircularProgress, Alert, Box } from '@mui/material';
import axios from 'axios';

const WasteModal = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', address: '', contact: '', wasteType: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError('');
    if (!formData.name || !formData.contact || !formData.address) return setError('Please fill required fields');
    try {
      setLoading(true);
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await axios.post('http://localhost:3000/api/waste', formData, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      onSuccess && onSuccess(res.data);
      setFormData({ name: '', address: '', contact: '', wasteType: '' });
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || 'Submission failed');
    } finally { setLoading(false); }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Request Waste Collection</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'grid', gap: 2, mt: 1 }}>
          <TextField label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
          <TextField label="Contact" name="contact" value={formData.contact} onChange={handleChange} required />
          <TextField label="Address" name="address" value={formData.address} onChange={handleChange} required />
          <TextField select label="Waste Type" name="wasteType" value={formData.wasteType} onChange={handleChange}>
            <MenuItem value="Municipal Solid Waste">Municipal Solid Waste</MenuItem>
            <MenuItem value="Biomedical Waste">Biomedical Waste</MenuItem>
            <MenuItem value="E-Waste">E-Waste</MenuItem>
            <MenuItem value="Plastic Waste">Plastic Waste</MenuItem>
          </TextField>
        </Box>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}> {loading ? <CircularProgress size={18} color="inherit"/> : 'Submit'} </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WasteModal;