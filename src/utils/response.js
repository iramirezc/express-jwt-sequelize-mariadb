const successResponse = (data) => ({ status: "success", data });
const failResponse = (data) => ({ status: "fail", data });
const errorResponse = (error) => ({ status: "error", message: error.message });

module.exports = {
  successResponse,
  failResponse,
  errorResponse,
};
