import User from "../../model/user/user.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { jwtToken } from "../../util/generateToken.js";
import { readText, deleteText } from "../../util/FsUtils.js";

const createUser = async (req, res) => {
  //collect the data from req body
  const data = req.body;

  const emailExist = await User.findOne({
    email: data.email,
  });
  if (emailExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "User with email already exist",
    });
    return;
  }

  const usernameExist = await User.findOne({
    username: data.username,
  });
  if (usernameExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "User with username already exist",
    });
    return;
  }

  //hass password
  const saltRound = 10;
  const hash = await bcrypt.hash(data.password, saltRound);

  const createdUser = await User.create({
    username: data.username,
    password: hash, //hash the password using bcrycpt
    email: data.email,
  });

  res.status(httpStatus.CREATED).json({
    status: "success",
    data: createdUser,
  });
};

const loginUser = async (req, res) => {
  //collect the data from req body
  const data = req.body;

  //check if user is registered
  const userExist = await User.findOne({
    email: data.email,
  });

  if (!userExist) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "No record found",
    });
    return;
  }
  const isConfirmed = await ComparePassword(data.password, userExist.password);

  //check that password is correct
  if (!isConfirmed) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "Credential not correct",
    });
    return;
  }

  res.status(httpStatus.OK).json({
    status: "success",
    data: userExist,
    token: jwtToken(userExist._id, userExist.email),
  });
};

async function ComparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

const getUsers = async (req, res) => {
  //import the db model and create the user
  const getUser = await User.find({});

  res.status(httpStatus.OK).json({
    status: "success",
    data: getUser,
  });
};

const getUser = async (req, res) => {
  const id = req.params.id;
  const type = req.query.type;
  const email = req.query.email;
  const username = req.query.username;

  console.log(type, email, "type");

  let user;
  switch (type) {
    case "ID":
      user = await User.findById(id);
      if (!user) {
        res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          message: "User ith id not found",
        });
        break;
      }

      res.status(httpStatus.OK).json({
        status: "success",
        data: user,
      });
      break;

    case "EMAIL":
      user = await User.findOne({ email: email });
      if (!user) {
        res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          message: "User with email not found",
        });
        break;
      }

      res.status(httpStatus.OK).json({
        status: "success",
        data: user,
      });
      break;

    case "USERNAME":
      user = await User.findOne({ username: username });
      if (!user) {
        res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          message: "User with username not found",
        });
        break;
      }

      res.status(httpStatus.OK).json({
        status: "success",
        data: user,
      });
      break;

    default:
      res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "User not found",
      });
  }
};

const updateUser = async (req, res) => {
  const { email, password } = req.body;
  const { id } = req.params;
  const foundUser = await User.findOne({ _id: id });
  if (!foundUser) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "User not found",
    });
  }

  const emailExist = await User.findOne({ email: email });
  if (emailExist) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "User with email already exist. Pls provide a unique email",
    });
    return;
  }
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { email: email, password: password },
    { new: true }
  );

  res.status(httpStatus.OK).json({
    status: "success",
    data: updatedUser,
  });
};

const userProfileUpload = async (req, res) => {
  const userId = req.user.id;
  console.log(req.file, "req.file");

  const foundUser = await User.findOne({ _id: userId });
  if (!foundUser) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "User not found",
    });
    return;
  }

  //remove old file from server
  try {
    const filePresent = await readText(`public/${foundUser.avatar}`);
    if (filePresent) {
      await deleteText(`public/${foundUser.avatar}`);
    }
  } catch (error) {
    console.log(error, "errorr");
  }

  const userWithImageUpload = await User.findByIdAndUpdate(
    { _id: userId },
    { avatar: req.file.filename },
    { new: true }
  );

  res.status(httpStatus.OK).json({
    status: "success",
    data: userWithImageUpload,
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const foundUser = await User.findOne({ _id: id });
  if (!foundUser) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "User not found",
    });
  }

  await User.findByIdAndDelete(id);

  res.status(httpStatus.OK).json({
    status: "success",
    data: `User with ID ${id} is deleted`,
  });
};

export {
  createUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  userProfileUpload,
};
