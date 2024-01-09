import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, lastName, email, password } = req.body;
  if (!name) {
    next("Name is required");
  }
  if (!email) {
    next("Email is required");
  }
  if (!password) {
    next("Password is required and should be atleast 6 character");
  }
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("Email already register, Please Login!");
  }
  const user = await userModel.create({ name, lastName, email, password });
  // token
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "User Created Successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  // validation
  if (!email || !password) {
    next("Please provide all Fields");
  }
  // find user by email
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid username or password");
  }
  // compare password

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid username or password");
  } else {
    user.password = undefined;
    const token = user.createJWT();
    res.status(200).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  }
};
