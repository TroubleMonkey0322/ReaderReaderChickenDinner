import User from '../models/users';
import Thought from '../models/thought';

const resolvers = {
  Query: {
    users: async () => await User.find().populate('thoughts'),
    user: async (_: any, { id }: { id: string }) => await User.findById(id).populate('thoughts'),
    thoughts: async () => await Thought.find(),
    thought: async (_: any, { id }: { id: string }) => await Thought.findById(id),
  },

  Mutation: {
    addUser: async (_: any, { username, email }: { username: string; email: string }) => {
      return await User.create({ username, email });
    },

    addThought: async (_: any, { thoughtText, username }: { thoughtText: string; username: string }) => {
      const thought = await Thought.create({ thoughtText, username });
      await User.findOneAndUpdate({ username }, { $push: { thoughts: thought._id } });
      return thought;
    },

    deleteUser: async (_: any, { id }: { id: string }) => {
      const user = await User.findById(id);
      if (!user) throw new Error('User not found');
      await Thought.deleteMany({ username: user.username });
      await user.deleteOne();
      return 'User and associated thoughts deleted';
    },
  },
};

export default resolvers;
