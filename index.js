/**
 * ErrorResponse
 *
 * @param {string} message
 * @param {number} statusCode
 * @param {object} error
 */
module.exports.errorResponse = (
  message,
  error,
  statusCode,
  headers,
  _stage
) => {
  const stage = _stage || "dev";
  let bodyObj = { error: true, message: message };
  statusCode = (error ? error.statusCode : null) || statusCode;

  if (error && stage != "prod") {
    bodyObj = { ...bodyObj, errorDetails: error };
  }

  const response = {
    statusCode: statusCode || 501,
    headers: { ...headers },
    body: JSON.stringify(bodyObj)
  };
  return response;
};

/**
 * SuccessResponse
 *
 * @param {object} result
 */
module.exports.successResponse = (result, headers) => {
  let bodyObj = { success: true, data: result };
  const response = {
    statusCode: 200,
    headers: { ...headers },
    body: JSON.stringify(bodyObj)
  };
  return response;
};
