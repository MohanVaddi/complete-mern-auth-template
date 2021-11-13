import mongoose, { Document } from 'mongoose';

export interface UserInterface extends Document {
    name: string;
    email: string;
    role: 'student' | 'faculty' | 'admin';
    classes: string[];
    subjects: string[];
    password: string;
    avatar?: string;
    date?: any;
}

const UserSchema = new mongoose.Schema<UserInterface>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
        default: 'student',
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    classes: {
        type: [String],
        requires: true,
    },
    subjects: {
        type: [String],
        requires: true,
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<UserInterface>('User', UserSchema);
