const errorHandler = (error, req, res, next) => {
  if (error.message === "data and hash arguments required") {
    return res.status(403).json({
      status: false,
      message: "Please provide password",
    });
  }

  if (error.source === "jwt middleware error") {
    return res.status(403).json({
      status: false,
      message: "Invalid token",
    });
  }

  res.status(error.status || 400).json({
    status: false,
    source: error.source || "An error occured somewhere in the app",
    message: error.message,
  });

  next();
};

module.exports = {
  errorHandler,
};

// const errorHandler = (error, req, res, next) => {
//   return res.status(error.status || 500).json({
//     status: false,
//     message: error.message || "Something went wrong",
//   });
//   next();
// };

// module.exports = { errorHandler };
