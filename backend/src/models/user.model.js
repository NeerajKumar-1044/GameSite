import {Schema, model} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: [true, "Password is required"],
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    Token:{
        type: String
    },
    Rating:{
        type: Number,
        default: 0
    }
}, {timestamps: true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.UpdateUserRating = async function (rate) {
    try {
        const Rate = rate;
        this.Rating = Number(Rate ? Rate : this.Rating);
    } catch (error) {
        return false;
    }
    return true;
}


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}


userSchema.methods.GenerateTokens = async function() {
    return jwt.sign({id: this._id}, process.env.TOKEN_SECRET_KEY, { expiresIn: "1h" })
}


export const User = model("User", userSchema);
