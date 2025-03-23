import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
});

const User = mongoose.model('User', userSchema);
export default User;
