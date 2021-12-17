module.exports = (err, req, res, next) => {
  if (
    req.app.get("env") !== "production" &&
    process.env.SILENT_LOGS !== "true"
  ) {
    console.log("==================== Error ====================");
    console.error(err);
    console.log("================== End Error ==================");
  }

  next(err);
};
