const mongoose = require('mongoose');
const { Schema } = mongoose;

const waterSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    address: { type: String, required: true, trim: true },
    issueType: { type: String, enum: ['leak', 'supply', 'quality', 'other'], default: 'other' },
    description: { type: String, trim: true },
    status: { type: String, enum: ['pending', 'in-progress', 'resolved'], default: 'pending' },
    submittedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    // optional geo location
    location: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('WaterRequest', waterSchema);
