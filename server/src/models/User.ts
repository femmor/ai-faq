import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

// compare password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Hash password before saving to database
userSchema.pre("save", async function (this: mongoose.Document & { password: string }, next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

export default User;