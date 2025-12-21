import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, Box, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const RegistrationModal = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', department: '', subOption: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError('');
    if (!formData.firstName || !formData.email || !formData.phone) return setError('Please fill required fields');
    try {
      setLoading(true);
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await axios.post('http://localhost:3000/api/registrations', formData, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      onSuccess && onSuccess(res.data);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', department: '', subOption: '' });
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || 'Submission failed');
    } finally { setLoading(false); }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Register for Services</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'grid', gap: 2, mt: 1 }}>
          <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
          <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          <TextField label="Email" name="email" value={formData.email} onChange={handleChange} required />
          <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
          <FormControl>
            <InputLabel id="department-modal">Department</InputLabel>
            <Select labelId="department-modal" name="department" value={formData.department} onChange={handleChange}>
              <MenuItem value="Waste Management">Waste Management</MenuItem>
              <MenuItem value="Water Supply Management">Water Supply Management</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>{loading ? <CircularProgress size={18} color="inherit"/> : 'Submit'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrationModal;
