import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = async (req, _, next) => {
    try {
        const token = await req.cookies?.Token;

        if (!token) { 
            req.user = null;
            return next(); 
        } 
             
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    
        const user = await User.findById(decodedToken?.id).select("-password -Token");
      
        if (!user) {
            req.user = null;
            return next(); 
        }
        
        req.user = user; 
        next();
    } catch (error) {
        req.user = null;
        next();
    }
}