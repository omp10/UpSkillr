import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  if(!user){
    return res.status(500).json({
      success: false,
      message: "User data not available"
    });
  }
  
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  // Convert Mongoose document to plain object if needed
  let userObject;
  if (user.toObject) {
    userObject = user.toObject();
  } else if (user.toJSON) {
    userObject = user.toJSON();
  } else {
    userObject = user;
  }

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,        // Required for HTTPS
      sameSite: "none",    // Allows cross-site cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      path: "/",           // Set path to match logout
    })
    .json({
      success: true,
      message,
      user: userObject
    });
};