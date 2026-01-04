const mongoose = require('mongoose');
const { Schema } = mongoose;

const wasteSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    wasteType: { type: String, required: true, trim: true },
    status: { type: String, enum: ['pending', 'scheduled', 'collected'], default: 'pending' },
    submittedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    // optional geo location
    location: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  { timestamps: { createdAt: 'submittedAt' } }
);

module.exports = mongoose.model('WasteRequest', wasteSchema);
