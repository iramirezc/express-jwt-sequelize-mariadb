module.exports = (err, req, res, next) => {
  if (req.app.get("env") === "development") {
    console.log("==================== Error ====================");
    console.error(err);
    console.log("================== End Error ==================");
  }

  next(err);
};
