import mongoose from 'mongoose';

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
});

const Thought = mongoose.model('Thought', thoughtSchema);
export default Thought;
