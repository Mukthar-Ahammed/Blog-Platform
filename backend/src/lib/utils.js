import jwt from "jsonwebtoken";

export const generateToken = (userid, res) => {
    const token = jwt.sign(
        { userId: userid },  
        process.env.JWT_SECRET,  
        { expiresIn: "10d" }
    );

    res.cookie("jwt", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
        httpOnly: true, 
        sameSite: process.env.NODE_ENV === "development" ? "Lax" : "None",  
        secure: process.env.NODE_ENV !== "development",  
    });

    return token;
};