// Session store model to preserve sessions across restarts.
import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  shop_name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  lastUpdatedAt: {
    type: Date,
  },
});

const GroupModel = mongoose.model("groups", groupSchema);

export default GroupModel;
