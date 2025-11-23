const userClient = require("../grpcClient");

exports.signup = (req, res) => {
  const { username, email, password } = req.body;
  const payload = {
    username,
    email,
    password,
  };

  console.log("Sending gRPC CreateUser request:", payload);

  userClient.CreateUser(payload, (error, response) => {
    if (error) {
      console.error("gRPC Error:", error.details || error.message);
      let statusCode = 500;
      if (error.code === 6) statusCode = 409;
      return res.status(statusCode).json({
        success: false,
        message: error.details || error.message,
      });
    }
    res.status(201).json({
      success: true,
      data: response,
    });
  });
};
exports.login = (req, res) => {
  const { email, password } = req.body;

  const payload = {
    email,
    password,
  };

  userClient.createToken(payload, (error, response) => {
    if (error) {
      console.error("gRPC Error:", error.details || error.message);
      let statusCode = 500;
      if (error.code === 6) statusCode = 409;
      if (error.code === 3) statusCode = 400;

      return res.status(statusCode).json({
        success: false,
        message: error.details || error.message,
      });
    }

    res.status(200).json({
      success: true,
      data: response,
    });
  });
};
exports.getUser = (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }
  const payload = { id: userId };

  userClient.getUser(payload, (error, response) => {
    if (error) {
      console.error("gRPC Error:", error.details || error.message);
      let statusCode = 500;
      if (error.code === 5) statusCode = 404;
    }
    res.status(200).json({
      success: true,
      data: response,
    });
  });
};
