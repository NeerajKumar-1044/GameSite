import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'


const generateTokens = async function(userId){
    try { 
        const user = await User.findById(userId);
        if(!user)throw new ApiError(400, "user not found to generate Token");
        const UserToken = user.GenerateTokens();
        await user.save({validateBeforeSave: false});
        return UserToken; 

    } catch (error) {
        throw new ApiError(400, "Token not generated");
    } 
} 

const registerUser =  async function(req, res){
    const {username, password, email} = req.body;

 
    if(!username || !password || !email){
        throw new ApiError(400, "Fullfill the details");
    }
 
    const existedUser = await User.findOne({ username: username });
    if (existedUser) throw new ApiError(409, "User already exists");

    const user = await User.create({
        username: username.toLowerCase(),
        email: email,
        password: password
    })
     
    const createdUser = User.findById(user._id).select("-password");
    if(!createdUser)throw new ApiError(409, "Falied to create User");

    const Token = await generateTokens(user._id);

    // Cookies options
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    }; 
    
    await user.save({validateBeforeSave: false});
    return res.status(200)
    .cookie("Token", Token, options) 
    .json({ 
        message: "registered successful",
        user: { ...user._doc}
    }); 
}   

const Login = async function(req, res) {
    const { email, password } = req.body;
    if (!(email && password)) throw new ApiError(404, "Email and password required");

    const user = await User.findOne({ email: email });
    if (!user) throw new ApiError(404, "User not found");

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    } 
 
    const Token = await generateTokens(user._id);

    // Cookies options
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    };   

    // user.Token = Token;
    await user.save({ validateBeforeSave: false });
 

    return res.status(200)
        .cookie("Token", Token, options) 
        .json({ 
            message: "Login successful",
            user: { ...user._doc}
        });
};

const Logout = async function(req, res) {
    try {

        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    Token: 1
                }
            }, 
            {
                new: true
            }
        );

        // Cookies options
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    };  

        return res.status(200)
            .clearCookie("Token", options)
            .json({ message: "User logged out successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
 
const getCurrentUser = async function(req, res) {
    if (!req.user) {
        return res.status(400).json({ message: "No user logged in" });
    }
    return res.status(200).json({ user: req.user });
};

async function Get_All_Leadboard_List(req, res) {
        try {
            const sortedData = await User.find().sort({ Rating: -1 });
            if (!sortedData) return res.status(404).json({ message: 'No data found' });
            return res.status(200).json(sortedData);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        } 
};
  

export {
    registerUser,
    Login,
    Logout,
    getCurrentUser,
    Get_All_Leadboard_List,
}