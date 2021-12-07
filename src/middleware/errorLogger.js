module.exports = (err, req, res, next) => {
  if (req.app.get("env") === "development") {
    console.error(err);
  }

  next(err);
};
