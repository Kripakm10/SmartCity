const WasteRequest = require('../model/waste');
const mongoose = require('mongoose');
const { createLog } = require('./logController');

// Create a new waste collection request
const createWaste = async (req, res) => {
  try {
    const { name, address, contact, wasteType } = req.body;
    const submittedBy = req.user?.id;
    const doc = new WasteRequest({ name, address, contact, wasteType, submittedBy });
    await doc.save();

    // log creation
    createLog({ action: 'create', entityType: 'waste', entityId: doc._id, message: `Waste request created for ${name}` , createdBy: submittedBy });

    return res.status(201).json({ message: 'Request received', request: doc });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const listMine = async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await WasteRequest.find({ submittedBy: userId }).sort({ submittedAt: -1 });
    return res.status(200).json(items);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// List waste requests (for admin)
const listWastes = async (req, res) => {
  try {
    const items = await WasteRequest.find().sort({ submittedAt: -1 });
    return res.status(200).json(items);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update status or other fields
const updateWaste = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const updates = req.body;
    const doc = await WasteRequest.findByIdAndUpdate(id, updates, { new: true });
    if (!doc) return res.status(404).json({ message: 'Not found' });

    createLog({ action: 'update', entityType: 'waste', entityId: doc._id, message: `Waste request updated (${JSON.stringify(updates)})`, createdBy: req.user?.id });

    return res.status(200).json({ message: 'Updated', request: doc });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete request
const deleteWaste = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const doc = await WasteRequest.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ message: 'Not found' });

    createLog({ action: 'delete', entityType: 'waste', entityId: doc._id, message: `Waste request deleted for ${doc.name}`, createdBy: req.user?.id });

    return res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createWaste, listWastes, listMine, updateWaste, deleteWaste };