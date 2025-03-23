"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../models/users"));
const thought_1 = __importDefault(require("../models/thought"));
const resolvers = {
    Query: {
        users: () => __awaiter(void 0, void 0, void 0, function* () { return yield users_1.default.find().populate('thoughts'); }),
        user: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield users_1.default.findById(id).populate('thoughts'); }),
        thoughts: () => __awaiter(void 0, void 0, void 0, function* () { return yield thought_1.default.find(); }),
        thought: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield thought_1.default.findById(id); }),
    },
    Mutation: {
        addUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { username, email }) {
            return yield users_1.default.create({ username, email });
        }),
        addThought: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { thoughtText, username }) {
            const thought = yield thought_1.default.create({ thoughtText, username });
            yield users_1.default.findOneAndUpdate({ username }, { $push: { thoughts: thought._id } });
            return thought;
        }),
        deleteUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const user = yield users_1.default.findById(id);
            if (!user)
                throw new Error('User not found');
            yield thought_1.default.deleteMany({ username: user.username });
            yield user.deleteOne();
            return 'User and associated thoughts deleted';
        }),
    },
};
exports.default = resolvers;
